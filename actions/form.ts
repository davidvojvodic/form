"use server"

import prisma from "@/lib/prisma"
import { formSchema, formSchemaType } from "@/schemas/form"
import { currentUser } from "@clerk/nextjs"
import { string } from "zod"

class UserNotFoundErr extends Error {}

export async function GetFormStats() {
    const user = await currentUser()

    if(!user) {
        throw new UserNotFoundErr()
    }

    const stats = await prisma.form.aggregate({
        where: {
            userId: user.id
        },
        _sum: {
            visits: true,
            submissions: true
        }
    })

    const visits = stats._sum.visits || 0;
    const submissions = stats._sum.submissions || 0;

    let submissionRate = 0;

    if(visits > 0) {
        submissionRate = (submissions / visits) * 100
    }

    const bounceRate = 100 - submissionRate;

    return {
        visits,
        submissions,
        submissionRate,
        bounceRate
    }
}


export async function CreateForm(data: formSchemaType){
    const validation = formSchema.safeParse(data)

    if(!validation.success) {
        throw new Error("Invalid form data")
    }
    
    const user = await currentUser()

    if(!user) {
        throw new UserNotFoundErr()
    }

    const form = await prisma.form.create({
        data: {
            userId: user.id,
            name: data.name,
            description: data.description
        }
    })

    if(!form) {
        throw new Error("Could not create form")
    }

    return form.id
}

export async function GetForms() {

    const user = await currentUser()
    
    if(!user) {
        throw new UserNotFoundErr()
    }

    return await prisma.form.findMany({
        where:{
            userId: user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export async function GetFormById(id: string) {
    const user = await currentUser()

    if(!user) {
        throw new UserNotFoundErr()
    }

    return await prisma.form.findUnique({
        where: {
            userId: user.id,
            id
        }
    })
}

export async function UpdateFormContent(id:string, jsonContent:string) {
    const user = await currentUser()

    if(!user) {
        throw new UserNotFoundErr()
    }

    return await prisma.form.update({
        where: {
            userId: user.id,
            id,
        },
        data: {
            content: jsonContent
        }
    })
}

export async function PublishForm(id: string) {
    const user = await currentUser()
    if(!user) {
        throw new UserNotFoundErr()
    }

    return await prisma.form.update({
        where: {
            userId: user.id,
            id
        },
        data: {
            published: true
        }
    })
}

export async function GetFormContentByUrl(formUrl: string) {
    return await prisma.form.update({
        select: {
            content: true
        },
        data: {
            visits: {
                increment: 1
            }
        },
        where: {
            shareURL: formUrl
        }
    })
}
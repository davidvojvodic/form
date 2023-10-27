"use client";

import { cn } from "@/lib/utils";
import DesignerSidebar from "./designer-sidebar";
import {
  useDndMonitor,
  useDroppable,
  DragEndEvent,
  useDraggable,
} from "@dnd-kit/core";
import { useState } from "react";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./form-elements";
import useDesigner from "@/hooks/use-designer";
import { idGenerator } from "@/lib/id-generator";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

const Designer = () => {
  const { elements, addElement } = useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd(event: DragEndEvent) {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(0, newElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/50"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <div key={element.id} className="w-full">
                  <DesignerElementWrapper key={element.id} element={element} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const { removeElement } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <>
      <div
        ref={draggable.setNodeRef}
        {...draggable.listeners}
        {...draggable.attributes}
        onMouseEnter={() => {
          setMouseIsOver(true);
        }}
        onMouseLeave={() => {
          setMouseIsOver(false);
        }}
        className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      >
        <div
          ref={topHalf.setNodeRef}
          className="absolute w-full h-1/2 rounded-t-md"
        />
        <div
          ref={bottomHalf.setNodeRef}
          className="absolute  w-full h-1/2 rounded-b-md bottom-0"
        />
        {mouseIsOver && (
          <>
            <div className="absolute right-0 h-full">
              <Button
                variant="outline"
                onClick={() => {
                  removeElement(element.id);
                }}
                className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              >
                <Trash />
              </Button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
              <p className="text-muted-foreground text-sm">
                Click for properties or drag to move
              </p>
            </div>
          </>
        )}
        {topHalf.isOver && (
          <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
        )}
        <div
          className={cn(
            "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
            mouseIsOver && "opacity-30",
            topHalf.isOver && "border-t-4 border-t-foreground",
            bottomHalf.isOver && "border-b-4 border-b-foreground"
          )}
        >
          <DesignerElement elementInstance={element} />
        </div>
        {bottomHalf.isOver && (
          <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
        )}
      </div>
    </>
  );
}

export default Designer;

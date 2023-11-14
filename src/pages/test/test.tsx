import React, { useState } from 'react';
import { Droppable, Draggable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import { reorderArray } from '../../utils/array';
// Styles
import classes from './test.module.scss';

type Props = {};

const TestPage = (props: Props) => {
  const [list, setList] = useState([
    { id: '1', content: 'Draggable item 1' },
    { id: '2', content: 'Draggable item 2' },
    { id: '3', content: 'Draggable item 3' },
    { id: '4', content: 'Draggable item 4' },
    { id: '5', content: 'Draggable item 5' },
    { id: '6', content: 'Draggable item 6' },
  ]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    // If dropping outside of a droppable error return nothing
    if (!destination) {
      return;
    }

    const reorderedList = reorderArray(list, source.index, destination.index);

    setList(reorderedList);
  };

  return (
    <div>
      <h2>Test page</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable-1'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TestPage;

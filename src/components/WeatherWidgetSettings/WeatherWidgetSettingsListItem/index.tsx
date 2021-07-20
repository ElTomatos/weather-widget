/**
 * Vendors
 */
import React from "react";
import {
  useDrag,
  useDrop,
  DropTargetMonitor,
  XYCoord,
  DndProvider,
} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

/**
 * Icons
 */
import { RiDeleteBinLine } from "react-icons/all";

/**
 * Typings
 */
type TProps = {
  city: string;
  index: number;
  onReorder: (id: string, atIndex: number) => void;
  onDelete: (city: string) => void;
};

/**
 * Expo
 */
const WeatherWidgetSettingsListItem: React.FC<TProps> = ({
  city,
  index,
  onReorder,
  onDelete,
}) => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: "weather-widget-item",
      item: { id: city, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, index } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          onReorder(droppedId, index);
        }
      },
    }),
    [city, index, onReorder]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "weather-widget-item",
      canDrop: () => false,
      hover({ id: draggedId }: any) {
        if (draggedId !== city) {
          onReorder(draggedId, index);
        }
      },
    }),
    [onReorder]
  );

  const handleDelete = () => {
    onDelete(city);
  };

  const opacity = isDragging ? 0 : 1;

  return (
    <div key={city} ref={preview} className="widgets-settings-item">
      <div
        className="widget-drag-trigger"
        ref={(node) => drag(drop(node))}
        style={{ width: "40px", height: "40px", background: "#000" }}
      />
      {city}
      <button
        type="button"
        className="widget-delete-btn"
        onClick={handleDelete}
      >
        <RiDeleteBinLine />
      </button>
    </div>
  );
};

export default WeatherWidgetSettingsListItem;

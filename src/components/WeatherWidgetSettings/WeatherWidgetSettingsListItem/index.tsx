/**
 * Vendors
 */
import React from "react";
import { useDrag, useDrop } from "react-dnd";

/**
 * Icons
 */
import { RiDeleteBinLine, GiHamburgerMenu } from "react-icons/all";

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
  const [, drag, preview] = useDrag(
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

  return (
    <div key={city} ref={preview} className="widgets-settings-item">
      <div className="widget-drag-trigger" ref={(node) => drag(drop(node))}>
        <GiHamburgerMenu />
      </div>
      <span className="widget-settings-item-title">{city}</span>
      <button
        type="button"
        className="widget-delete-btn btn"
        onClick={handleDelete}
      >
        <RiDeleteBinLine />
      </button>
    </div>
  );
};

export default WeatherWidgetSettingsListItem;

import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

interface ListGroupProps {
  items: string[];
  heading: string;
}
function ListGroup({ items, heading }: ListGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <Fragment>
      <h1>{heading}</h1>
      <ul className="list-group">
        {items.map((items, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={items}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {items}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
export default ListGroup;

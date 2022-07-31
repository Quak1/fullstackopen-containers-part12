import { render, screen, fireEvent } from "@testing-library/react";

import Todo from "./Todo";

describe("Todo component", () => {
  const todo = { done: false, text: "test todo" };
  const onDelete = jest.fn();
  const onComplete = jest.fn();

  it("renderes the component", () => {
    render(
      <Todo todo={todo} onClickDelete={onDelete} onClickComplete={onComplete} />
    );
    screen.getByText("test todo");
  });

  it("can complete", () => {
    render(
      <Todo todo={todo} onClickDelete={onDelete} onClickComplete={onComplete} />
    );

    fireEvent.click(screen.getByText("Set as done"));

    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});

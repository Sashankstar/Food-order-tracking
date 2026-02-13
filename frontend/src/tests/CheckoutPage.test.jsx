import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import CheckoutPage from "../pages/CheckoutPage";

test("renders checkout title", () => {
  render(
    <BrowserRouter>
      <CheckoutPage 
        cart={[]} 
        setCart={() => {}} 
        setOrderId={() => {}} 
      />
    </BrowserRouter>
  );

  expect(screen.getByText("Checkout")).toBeInTheDocument();
});

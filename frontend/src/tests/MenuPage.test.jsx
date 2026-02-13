import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import axios from "axios";
import MenuPage from "../pages/MenuPage";

vi.mock("axios");

test("renders menu header", async () => {
  axios.get.mockResolvedValue({ data: [] });

  render(
    <BrowserRouter>
      <MenuPage cart={[]} setCart={() => {}} />
    </BrowserRouter>
  );

  expect(await screen.findByText("CraveWave")).toBeInTheDocument();
});

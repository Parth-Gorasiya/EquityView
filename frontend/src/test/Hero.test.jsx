import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Hero from "../LandingPage/Home/Hero.jsx";

describe("Hero Component", () => {
  test("renders the hero image", () => {
    render(<Hero />);

    const heroImage = screen.getByAltText("Hero Image");

    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute(
      "src",
      "media/images/homeHero.png"
    );
  });

  test("renders the main heading", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", {
      name: /invest in everything/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test("renders the investment description", () => {
    render(<Hero />);

    const description = screen.getByText(
      /online platform to invest in stocks/i
    );

    expect(description).toBeInTheDocument();
  });

  test("renders the signup button", () => {
    render(<Hero />);

    const signupButton = screen.getByRole("button", {
      name: /signup for free/i,
    });

    expect(signupButton).toBeInTheDocument();
    expect(signupButton).toBeEnabled();
  });
});
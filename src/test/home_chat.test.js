import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import React, { createElement } from "react";
import home from "./../components/home";
import renderer from "react-test-renderer";


afterEach(cleanup);

it("Snapshot Home", () => {
    const home = renderer.create(<home></home>).toJSON();
    expect(home).toMatchSnapshot();
});




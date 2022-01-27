import { TestBed } from "@angular/core/testing";

import { AuthGuard } from "./auth.guard";
import { TestingModule } from "src/app/testing/testing.module";

describe("AuthGuard", () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});

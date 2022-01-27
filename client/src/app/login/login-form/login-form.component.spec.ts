import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ApolloTestingController } from "apollo-angular/testing";
import { TranslateTestingModule } from "ngx-translate-testing";

import { LoginFormComponent } from "./login-form.component";
import { LoginDocument } from "src/app/graphql/services";
import en from "../../../assets/i18n/en.json";
import ar from "../../../assets/i18n/ar.json";
import { TestingModule } from "src/app/testing/testing.module";

describe("LoginFormComponent", () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let controller: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestingModule,
        TranslateTestingModule.withTranslations({
          en: en,
          ar: ar,
        }).withDefaultLanguage("en"),
      ],
      declarations: [LoginFormComponent],
    }).compileComponents();

    controller = TestBed.inject(ApolloTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should login", () => {
    //Scaffold the component
    TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;

    // Setup data
    component.username = "admin";
    component.password = "admin";
    // Call relevant method
    component.login();

    // Assertions
    // TODO Check how to properly provide mock response to the mutation
    const testOperation = controller.expectOne((operation) => {
      expect(operation.query.definitions).toEqual(LoginDocument.definitions);
      return true;
    });

    expect(testOperation.operation.variables.username).toEqual("admin");
    expect(testOperation.operation.variables.password).toEqual("admin");

    // Assert that there are no outstanding operations.
    controller.verify();
  });
});

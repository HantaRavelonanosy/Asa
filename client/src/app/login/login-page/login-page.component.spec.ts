import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateTestingModule } from "ngx-translate-testing";

import { LoginPageComponent } from "./login-page.component";
import { TestingModule } from "src/app/testing/testing.module";
import en from "../../../assets/i18n/en.json";
import ar from "../../../assets/i18n/ar.json";

describe("LoginPageComponent", () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestingModule,
        TranslateTestingModule.withTranslations({
          en: en,
          ar: ar,
        }).withDefaultLanguage("en"),
      ],
      declarations: [LoginPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

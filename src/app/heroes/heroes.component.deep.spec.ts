import { NO_ERRORS_SCHEMA } from "@angular/compiler";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent (deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;



    beforeEach(() => {

        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 24 },
            { id: 3, name: 'SuperDude', strength: 55 }
        ]

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHeroes', 'deleteHeroes'])

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent);
        
    });
    it('should render each hero as a hero component', () => {
        
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        //run ngOnInit
        fixture.detectChanges();

        const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

        expect(heroComponentsDEs.length).toEqual(3);

        for(let i=0; i< heroComponentsDEs.length; i++) {
            expect(heroComponentsDEs[i].componentInstance.hero).toEqual(HEROES[i])
        }
        
  


    });

})
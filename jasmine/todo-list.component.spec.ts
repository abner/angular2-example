import { TodoFilter } from './../src/todo/todo-filter.pipe';
import { TodoService } from './../src/todo/todo.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TodoListComponent } from '../src/todo/todo-list.component';


import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
}
    from '@angular/platform-browser-dynamic/testing';


describe(TodoListComponent.name, () => {
    let todoServiceMock: TodoService = <any>{ getTodos: () => [{ name: 'task 1', done: false }] };
    let fixture: ComponentFixture<TodoListComponent>;

    beforeAll(() => {
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    });

    afterAll(() => {
        TestBed.resetTestEnvironment();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TodoListComponent,
                TodoFilter
            ],
            imports: [
                FormsModule
            ],
            providers: [
                { provide: TodoService, useValue: todoServiceMock }
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]

        });
        fixture = TestBed.createComponent(TodoListComponent);
    });

    it('calls service to get todos', () => {
        fixture.componentInstance['todoService'].getTodos = jasmine.createSpy('getTodos').and.returnValue([]);
        fixture.detectChanges();
        expect(fixture.componentInstance['todoService'].getTodos).toHaveBeenCalled();
    });

    it('adds a new todo after fill the todo name and press Enter', () => {
        fixture.detectChanges();
        let el = fixture.debugElement.query(By.css('input'));
        fixture.componentInstance.newTodo.name = 'new task';
        el.triggerEventHandler('keyup', { keyCode: 13 });
        fixture.detectChanges();
        
        expect(fixture.componentInstance.todos.filter(o => o.name == 'new task').length).toEqual(1);
    });

    // it('resets the new Todo after initialization', () => {
    //     let spyOnResetNewTodo = sinon.spy(fixture.componentInstance, 'resetNewTodo');
    //     fixture.detectChanges();
    //     expect(spyOnResetNewTodo.called).to.be.ok;
    // });

    // it('resets the new Todo after adding a new task', () => {
    //     fixture.detectChanges();

    //     let spyOnResetNewTodo = sinon.spy(fixture.componentInstance, 'resetNewTodo');

    //     let el = fixture.debugElement.query(By.css('input'));
    //     fixture.componentInstance.newTodo.name = 'new task';
    //     el.triggerEventHandler('keyup', { keyCode: 13 });
    //     fixture.detectChanges();

    //     expect(spyOnResetNewTodo.called).to.be.ok;
    // });

    // it('deletes a todo', () => {
    //     fixture.detectChanges();
    //     let firstTodo = fixture.componentInstance.todos[0];
    //     fixture.componentInstance.deleteTodo(firstTodo);
    //     expect(fixture.componentInstance.todos).to.not.include(firstTodo);
    // });

    // it('clears all done tasks', () => {
    //     fixture.detectChanges();

    //     let doneTask1 = { name: 'Done Task 1', done: true };
    //     let doneTask2 = { name: 'Done Task 2', done: true };

    //     fixture.componentInstance.todos.push(doneTask1);
    //     fixture.componentInstance.todos.push(doneTask2);
    //     fixture.componentInstance.clearAllDone();

    //     expect(fixture.componentInstance.todos).to.not.include(doneTask1);
    //     expect(fixture.componentInstance.todos).to.not.include(doneTask2);
    // });

    // it('#shouldShowClearAll responds true when exists done tasks', () => {
    //     fixture.detectChanges();

    //     let doneTask1 = { name: 'Done Task 1', done: true };
    //     fixture.componentInstance.todos.push(doneTask1);

    //     expect(fixture.componentInstance.shouldShowClearAll()).to.be.true;
    // });

    // it('#shouldShowClearAll responds false when does not exists done tasks', () => {
    //     fixture.detectChanges();

    //     let doneTask1 = { name: 'Done Task 1', done: false };
    //     fixture.componentInstance.todos.push(doneTask1);

    //     expect(fixture.componentInstance.shouldShowClearAll()).to.be.false;
    // });


});
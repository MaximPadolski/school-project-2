import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DATA } from './data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DragDropModule, CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public readonly questions = DATA;
  public readonly box1 = [{q: 'море', a: 'сущ'}];
  public readonly box2 = [{q: 'море', a: 'сущ'}];
  public readonly className = signal({key: '', value: ''});


  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: any, ) {
    const item = event.previousContainer.data[event.previousIndex];

    // console.log('drop event', { event, item });

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      if ((event.container.id === 'cdk-drop-list-1' && item.a === 'сущ') ||
          (event.container.id === 'cdk-drop-list-2' && item.a === 'прил')
      ) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
        this.setClassName(event.container.id, 'correct');
      } else {
        this.setClassName(event.container.id, 'wrong');
      }

    }
  }

  private setClassName(key: string, value: string): void {
    this.className.set({key, value});
    setTimeout(() => {
      this.className.set({key, value: ''});
    }, 1500);
  }
}

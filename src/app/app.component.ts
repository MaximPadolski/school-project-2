import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
  public readonly questions = this.shuffle(DATA);
  public readonly box1: any[] = [];
  public readonly box2: any[] = [];
  public readonly className = signal({key: '', value: ''});

  drop(event: any, ) {
    const item = event.previousContainer.data[event.previousIndex];

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

  private shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
}

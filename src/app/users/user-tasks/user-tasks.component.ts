import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  // userId = input.required<string>();
  userName = '';
  private userServices = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  private activatedRoute = inject(ActivatedRoute);

  // userName = computed(
  //   () => this.userServices.users.find((u) => u.id === this.userId())?.name
  // );
  ngOnInit(): void {
    console.log(this.activatedRoute);
    const subscribe = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userName =
          this.userServices.users.find((u) => u.id === paramMap.get('userId'))
            ?.name || '';
      },
    });
    this.destroyRef.onDestroy(() => {
      subscribe.unsubscribe();
    });
  }
}

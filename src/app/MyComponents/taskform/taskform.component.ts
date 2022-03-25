import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Task } from '../task/task';
@Component({
  selector: 'app-taskform',
  templateUrl: './taskform.component.html',
  styleUrls: ['./taskform.component.css'],
})
export class TaskformComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() taskForUpdate!: Task;
  @Input() isNewTask!:boolean;
  myForm!: FormGroup;

  @Output() closeModal = new EventEmitter<void>();
  @Output() addTaskEvent = new EventEmitter<Task>();
  @Output() updateTaskEvent = new EventEmitter<Task>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if(this.isNewTask){
      this.myForm.reset();
      return;
    }
    this.myForm = this.fb.group({
      name: [this.taskForUpdate?.name || ''],
      description: [
        this.taskForUpdate?.description || ''],
      status: [this.taskForUpdate?.status || ''],
      priority: [
        this.taskForUpdate?.priority || ''],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (!changes?.['taskFoUpdate']) {
      this.ngOnInit();
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      if(this.isNewTask){
        this.addTaskEvent.emit(this.myForm.value);
      }
      else if (this.taskForUpdate) {
        this.updateTaskEvent.emit({...this.taskForUpdate , ...this.myForm.value});
        console.log(this.myForm.value , " update task event")
      }
      this.myForm.reset();
    }
  }

  onCloseHandled() {
    this.closeModal.emit();
    this.myForm.reset();
  }
}

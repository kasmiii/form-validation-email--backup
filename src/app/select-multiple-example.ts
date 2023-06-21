import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { NgIf } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
/** @title Select with multiple selection */
@Component({
  selector: 'select-multiple-example',
  templateUrl: 'select-multiple-example.html',
  styleUrls: ['select-multiple-example.css'],
  //standalone: true,
})
export class SelectMultipleExample implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  fruits: string[] = ['Lemon', 'Lime', 'Apple'];

  addOnBlurCC = true;
  addOnBlurBCC = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  CCs: string[] = [];
  BCCs: string[] = [];
  selectedFiles: File[] = [];

  //announcer = inject(LiveAnnouncer);
  emailForm: FormGroup;
  //matcher = new ErrorStateMatcher();

  attachments: string[] = [];
  ccAddresses: string[] = [];
  bccAddresses: string[] = [];

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      objectControl: ['', [Validators.required]],
      commentControl: ['', [Validators.required]],
    });
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
  }

  removeFile(file: File) {
    const index = this.selectedFiles.indexOf(file);
    if (index !== -1) {
      this.selectedFiles.splice(index, 1);
    }
  }

  sendEmail() {
    console.log(
      'Sending email:',
      this.attachments,
      this.CCs,
      this.BCCs,
      this.emailForm.get('objectControl'),
      this.emailForm.get('commentControl')
    );
  }

  addAddress(addressType: string, event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (addressType === 'cc') {
      // Add our fruit
      if (value) {
        this.CCs.push(value);
      }
    } else {
      if (value) {
        this.BCCs.push(value);
      }
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeAddress(addressType: string, email: string): void {
    if (addressType === 'cc') {
      const index = this.CCs.indexOf(email);
      if (index >= 0) {
        this.CCs.splice(index, 1);
        //this.announcer.announce(`Removed ${email}`);
      }
    } else {
      const index = this.BCCs.indexOf(email);
      if (index >= 0) {
        this.BCCs.splice(index, 1);
        //this.announcer.announce(`Removed ${email}`);
      }
    }
  }

  editAddress(addressType: string, email: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (addressType === 'cc') {
      // Remove fruit if it no longer has a name
      if (!value) {
        this.removeAddress('cc', email);
        return;
      }

      // Edit existing fruit
      const index = this.CCs.indexOf(email);
      if (index >= 0) {
        this.CCs[index] = value;
      }
    } else {
      //if the email is of type BCC address
      // Remove fruit if it no longer has a name
      if (!value) {
        this.removeAddress('bcc', email);
        return;
      }

      // Edit existing fruit
      const index = this.BCCs.indexOf(email);
      if (index >= 0) {
        this.BCCs[index] = value;
      }
    }
  }

  // removeFile(file: File) {
  //   const index = this.selectedFiles.indexOf(file);
  //   if (index !== -1) {
  //     this.selectedFiles.splice(index, 1);
  //   }
  // }

  // onFileSelected(event: any) {
  //   const files: FileList = event.target.files;
  //   // Process the selected files as needed
  //   console.log(files);
  // }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      //this.announcer.announce(`Removed ${fruit}`);
    }
  }
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */

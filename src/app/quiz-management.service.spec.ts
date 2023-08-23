import { TestBed } from '@angular/core/testing';

import { QuizManagementService } from './quiz-management.service';

describe('QuizManagementService', () => {
  let service: QuizManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

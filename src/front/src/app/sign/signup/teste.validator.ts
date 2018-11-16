import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';
import { SignUpService } from './signup.service';

// export function existingMobileNumberValidator(userService: SignUpService): AsyncValidatorFn {
//   return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
//     return userService.getUserByEmail(control.value).map(
//       users => {
//         return (users && users.length > 0) ? {"mobNumExists": true} : null;
//       }
//     );
//   };
// } 
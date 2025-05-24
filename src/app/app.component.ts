import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  jsonText = '';
  tsText = ''
  errorMessage!: any
  hasError = false;
  resultHeader = 'Output'
  createTS(button: string) {
    try {
      const objFromJson = JSON.parse(this.jsonText)
      this.resultHeader = button == 'TS' ? 'Typescript' : button === 'FORM' ? "Form Control" : 'Output'
      this.tsText = button == 'TS' ? "{\n" : 'new FormGroup({\n'
      for (let key in objFromJson) {
        const type = button === 'TS' ? Array.isArray(objFromJson[key]) ? 'Array' : typeof objFromJson[key] : 'new FormControl()'
        this.tsText = this.tsText + "\t" + key + " : " + type + '\n';
      }
      this.tsText += button == 'TS' ? "}\n" : '})\n'
      console.log("cdsa", this.tsText)

    } catch (error) {
      this.hasError = true
      this.errorMessage = error
    }
  }
  closeModal() {
    this.hasError = false
  }
  formBuilder() {
    this.tsText = this.tsText.replace('new FormGroup', 'this.fb.group')
    this.tsText = this.tsText.replaceAll('new FormControl()', '[]')
  }
  reset() {
    this.jsonText = ''
    this.tsText = ''
    this.resultHeader = "Output"
  }
}

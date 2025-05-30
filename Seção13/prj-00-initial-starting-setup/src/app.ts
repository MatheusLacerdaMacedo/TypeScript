// autobind decorator
function autoBind(
_: any, 
_2: string, 
descriptor: PropertyDescriptor) 
{
 const originalMethod = descriptor.value;
 const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
    }
 };
 return adjDescriptor;
}


// ProjectInput class

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;


    constructor() {
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!;
        this.hostElement = <HTMLDivElement>document.getElementById('app')!;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement

        this.configure
        this.attatch()
    }

    @autoBind
    private submiteHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }

    private configure() {
        this.element.addEventListener('submit', this.submiteHandler)
    }

    private attatch() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const prjtInput = new ProjectInput();
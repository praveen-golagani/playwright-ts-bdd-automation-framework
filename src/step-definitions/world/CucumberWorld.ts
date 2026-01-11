import { World, setWorldConstructor } from "@cucumber/cucumber";

export class CucumberWorld extends World{
    //Base URL
    private url?: string;

    //Person
    private firstName?: string;
    private lastName?: string;
    private emailAddress?: string;

    //Setters for url, first and last names etc:
    setUrl(url: string){
        this.url = url;
    }

    setFirstName(firstName:string){
        this.firstName = firstName;
    }

     setLastName(lastName:string){
        this.lastName = lastName;
    }

     setEmailAddress(emailAddress:string){
        this.emailAddress = emailAddress;
    }

    //Getters for url, first and last names etc:
    getUrl(){
        return this.url;
    }

    getFirstName(){
        return this.firstName;
    }

     getLastName(){
        return this.lastName;
    }

     getEmailAddress(){
       return this.emailAddress;
    }
}

// tells cucumber world to use our custom world
setWorldConstructor(CucumberWorld);
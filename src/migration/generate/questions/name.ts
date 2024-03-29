import {PromptObject} from "prompts";
import StrictOmit from "@axiona/object/strict-omit.js";
import Questions from "@axiona/prompt/questions/questions.js";

export default class Name implements Questions<{name:string}> {

    public name : StrictOmit<PromptObject, 'name'> = {
        type: 'text',
        message: 'migration name?',
        initial :  'newMigration',
        validate: value => value.match(/[^a-zA-Z]/) ? `only alphabet allowed` : true
    };


}

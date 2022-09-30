import Article from "./models/Article";
import Comment from "./models/Comment";
import Person from "./models/Person";

import { IArticleWithCommentsDTO } from "./interfaces/IArticle";

(async () => {
    // await personDemo();

    relationDemo();
})(); 

async function relationDemo() {
    // await createFirstArticle();
    // await createFirstComment();
    // await createRelation();
    await readArticle();
}

async function createFirstArticle() {
    await Article.create({
        author: 'Peter',
        title: 'First Article',
        content: 'Lorem Ipsum Dolor Sit Amet',
    });
}

async function createFirstComment() {
    await Comment.create({
        author: 'Jhon',
        content: 'Nice article!'
    });
}

async function createRelation() {
    const article = await Article.findOne({});
    const comment = await Comment.findOne({});

    if(article && comment){
        article.comments.push(comment._id);
        await article.save();
    }
}

async function readArticle() {
    const article = await Article.findOne<IArticleWithCommentsDTO>({}).populate('comments');
    // const comments = await Comment.find({_id: article?.comments});

    console.log(article);
    console.log('>>> ' + article?.comments[0].content);    
}

async function personDemo() {
    await createPerson();
    await readPersons();
}

async function readPersons() {
    const data = await Person.find({ _id: '6336d419e1d33eb2b25052fd' });

    console.log(data); 
};

async function createPerson() {
    const personData = { name: 'Asen Zlatarov', age: 35 };
    const person = new Person(personData);

    await person.save(); 
};
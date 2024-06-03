import fs from "fs"
import matter from "gray-matter"
import path from 'path';
import moment from "moment"

import type { ArticleItem } from '@/types';
import { remark } from "remark";
import html from "remark-html";

const articlesDirectory = path.join(process.cwd(), 'articles');
const getSortedArticles = (): ArticleItem[] => {
    const fileNames = fs.readdirSync(articlesDirectory)

    const allArticlesData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(articlesDirectory, fileName)
        const fillContents = fs.readFileSync(fullPath, "utf-8")

        const matterResult = matter(fillContents)

        return {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
            category: matterResult.data.category
        }
    })

    return allArticlesData.sort((a, b) => {
        const format = "DD-MM-YYYY";
        const dateOne = moment(a.date, format);
        const dateTwo = moment(b.date, format);
        if (dateOne.isBefore(dateTwo)) {
            return -1;
        } else if (dateTwo.isBefore(dateOne)) {
            return 1;
        } else {
            return 0;
        }
    })
}

export const getCategoriesedArticles = (): Record<string, ArticleItem[]> => {
    const sortedArticles = getSortedArticles();
    const categoriesedArticles: Record<string, ArticleItem[]> = {};

    sortedArticles.forEach(article => {
        const articleCategory = article.category;
        if (!categoriesedArticles[articleCategory]) {
            categoriesedArticles[articleCategory] = [];
        }
        categoriesedArticles[articleCategory].push(article);
    })
    return categoriesedArticles;
}

export const getArticleData = async(id: string) => {
    const fullPath = path.join(articlesDirectory, `${id}.md`);

    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContents);
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)

    const contentHtml = processedContent.toString()

    return {
        id,
        contentHtml,
        title: matterResult.data.title,
        category: matterResult.data.category,
        date: moment(matterResult.data.date, "DD-MM-YYYY").format("MMMM De YYYY"),
    }

}
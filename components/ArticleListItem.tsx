import Link from "next/link";
import type { ArticleItem } from "../types";

interface Props {
  category: string;
  articles: ArticleItem[];
}

const ArticleItemList = ({ category, articles }: Props) => {
  return (
    <div>
      <h2>{category}</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/${article.id}`} key={article.id}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleItemList;

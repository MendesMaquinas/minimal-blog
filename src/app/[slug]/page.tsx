import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { getArticleData } from "@/lib/articles";

const Article = async ({params}: {params: {slug: string}}) => {
    const articleData= await getArticleData(params.slug);

    return (
        <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
            <div className="flex justify-between font-poppins">
                <Link href="/" className="flex items-center gap-2">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-900" />
                    <p className="text-xs">back to home</p>
                </Link>
                <p>{articleData.date.toString()}</p>
            </div>
            <article className="article" dangerouslySetInnerHTML={{__html: articleData.contentHtml}}/>
        </section>
    )
}

export default Article;
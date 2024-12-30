import QueryBuilder from '../../../builder/QueryBuilder';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const getAllBlogsFromDB = async (query: Record<string, any>) => {
      const blogsQuery = new QueryBuilder(Blog.find(), query)
            .search(['title', 'description'])
            .filter()
            .paginate()
            .sort()
            .fields();

      const meta = await blogsQuery.countTotal();
      const result = await blogsQuery.modelQuery;

      return {
            result,
            meta,
      };
};
const getSingleBlogFromDB = async (id: string) => {
      const result = await Blog.findById(id);
      if (!result) {
            throw new Error('Blog not found');
      }
      return result;
};
const createBlogToDB = async (blogData: IBlog) => {
      const result = await Blog.create(blogData);
      return result;
};

const updateBlogToDB = async (id: string, blogData: IBlog) => {
      console.log(blogData);
      const result = await Blog.findByIdAndUpdate(id, blogData, { new: true });

      if (!result) {
            throw new Error('Blog not found');
      }
      return result;
};
const deleteBlogFromDB = async (id: string) => {
      const result = await Blog.findByIdAndDelete(id);
      if (!result) {
            throw new Error('Blog not found');
      }
      return result;
};

export const BlogService = {
      createBlogToDB,
      getAllBlogsFromDB,
      getSingleBlogFromDB,
      deleteBlogFromDB,
      updateBlogToDB,
};

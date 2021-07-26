<h2 align="center"> HENOSIS </h2>

<p align="center">      
      <img src="https://miro.medium.com/max/6000/1*ZQywXQQMs32Dray68Sjptg.jpeg" alt="conference-events"  width="500px" /> </br>
</p>

- Server Code : [Henosis Server Repo](https://github.com/mir-hussain/henosis-server)

- Live Site : [Henosis Live Site](henosis.vercel.app)

## Homepage

![Homepage Developer's Book](public/images/logo.png)

## Documentation

- [Next Js Documentation](docs/multile-branch-team-collaboration-guideline.md)

- [TypeScript Documentation ](docs/how-to-setup-graphql-prisma-nextjs-app.md)
- [ Express Documentation ](graphql/Readme.md)
- [ Mongoose Documentation ](graphql/Readme.md)
- [ Vercel Documentation ](graphql/Readme.md)

## How to run this project

- Clone first `git clone https://github.com/mir-hussain/henosis-client.git henosis-client`
- `cd henosis-client`
- run command `npm install`
- run command `npm run dev`
- browse: http://localhost:3000 for seeing main application views

# Features

- User can create blog
- anyone can view blogs
- user can update own blog
- user can delete own blog
  on Going :smile: ,
- user could clap for blog
- user could comment create , edit & delete for a blog.
- rich text edited blog
- admin can manage everything

# Technical Features

- GraphQL Server which gives a flexible way to query/exchange data between server & client
- MVC Design Pattern implemented for easy mangement
- Mongoose used for flexible Database Query.
- Batch Query for optimize fetching data
- Handled token based authentication by JWT
- Authentication Header verified on both side (Client & Server Side )
- User can create blog, read others blog update own blog & delete own blog
- User can see his/her profile
- Data managed via RestAPI
- Frontend managed via Next.js. Because a project management web application should be SEO friendly. Next.js is a good solution for this. Auto code splitting , lazy loading, image progressive loading is implemented by default.

# Used Technologies

Backend

- Language : Node.js
- Framework : Express.js
- ORM : Mongoose
- Database : MongoDB

Frontend

- Language : JavaScript & TypeScript
- UI Framework : NEXT.js
- UI Design Library: SaaS
- State Management : Redux

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

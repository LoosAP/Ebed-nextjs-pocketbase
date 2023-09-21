# Alföldi Nyomda Ebédrendelés

A program I wrote during my internship at Alföldi Printing House, with the use of [Next.js](https://nextjs.org/). The goal of this project was to make the lunch ordering process easier for both vendors and end users.

## Tools & stacks

- [Next.js](https://nextjs.org/)
- [Pocketbase](https://pocketbase.io/)
- [Node.js](https://nodejs.org/en)
- [Tailwindcss](https://tailwindcss.com/)
- [Resend](https://resend.com/)
- [Radix UI](https://www.radix-ui.com/)

## Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/your-project.git

```

2. Install dependencies

```bash
npm i

```

3. Run the dev script

```bash
npm run dev

```

4. In a separate terminal, run

```bash
./pocketbase serve

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

For the pocketbase Admin UI, open [http://127.0.0.1:8090/\_/](http://127.0.0.1:8090/_/) with your browser.

## Usage

- Once you got the two terminals running, you'll see the opening page of the website
  ![opening page](/public/img/md/md1.png)

- Navigate to "[Belépés](http://localhost:3000/account/login)", where you can login as either an user, a vendor, or an admin.

- username: user/vendor/admin
- password: 12345678

- to use resend and test the email sending service, you'll have to register an account at [Resend](https://resend.com/), register your domain, create an API Key, and use their names in the .env.local file. Read the docs [here](https://resend.com/docs/introduction)
  ![.env.local](/public/img/md/md2.png)

- You can login to the [Pocketbase Admin UI](http://127.0.0.1:8090/_/) like this:
  email: anyrtebedrendelesapp@gmail.com
  password: 12345678910
  Read the Pocketbase docs [here](https://pocketbase.io/docs/)

![pb ui](/public/img/md/md3.png)

## License

- Creative Commons Attribution-NonCommercial-NoDerivatives (CC BY-NC-ND) license

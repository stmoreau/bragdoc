# bragdoc

Track your wins from the command line.

A simple CLI to maintain your [brag document](https://bragdoc.io) — a running log of your accomplishments at work. Perfect for performance reviews, 1:1s, salary negotiations, or when imposter syndrome hits.

## Install

```bash
npm install -g bragdoc
```

Or use directly with npx:

```bash
npx bragdoc add delivered "Shipped new feature"
```

## Usage

### Set up your profile

```bash
bragdoc config --name "Your Name" --role "Your Role" --period "2026"
```

### Add wins to sections

```bash
bragdoc add delivered "Shipped new checkout flow"
bragdoc add collaboration "Mentored Sarah through her first deployment"
bragdoc add growth "Learned Kubernetes"
bragdoc add impact "Reduced API latency by 40%"
bragdoc add feedback "Got shoutout from CTO for handling outage"
bragdoc add goals "Lead the Q2 reliability initiative"
```

**Available sections:**

- 🚀 `delivered` - What you shipped
- 🤝 `collaboration` - How you helped others
- 🌱 `growth` - How you grew
- 📈 `impact` - Impact you made
- 💬 `feedback` - Recognition you received
- 🎯 `goals` - What's next

### List your wins

```bash
bragdoc list              # Show all sections
bragdoc list delivered    # Show specific section
```

### Export as markdown

```bash
bragdoc export
```

## Storage

Your brag doc is stored as JSON at `~/.bragdoc.json`. Compatible with the web editor at [bragdoc.io/write](https://bragdoc.io/write).

## Why keep a brag doc?

You did great work this year. You just forgot 90% of it.

That project you rescued in March? Gone. The junior dev you mentored? Poof. The production incident you fixed at 11pm? Your brain deleted it to make room for Netflix plot lines.

Your manager doesn't remember either — they have 8 other people to think about.

A brag doc fixes this. Write down your wins as they happen. Takes 2 minutes. Do it every Friday.

## Learn more

Visit [bragdoc.io](https://bragdoc.io) to learn more about brag documents and why you should keep one.

## License

MIT

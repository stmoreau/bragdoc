# bragdoc

Track your wins from the command line.

A simple CLI to maintain your [brag document](https://bragdoc.io) — a running log of your accomplishments at work. Perfect for performance reviews, 1:1s, salary negotiations, or when imposter syndrome hits.

## Install

```bash
npm install -g bragdoc
```

Or use directly with npx:

```bash
npx bragdoc add "Shipped new feature to production"
```

## Usage

### Add a win

```bash
bragdoc add "Led API migration, reduced latency 40%"
```

With a category:

```bash
bragdoc add -c work "Shipped new feature"
bragdoc add -c growth "Completed AWS certification"
```

### List your wins

```bash
bragdoc list
```

Show only the last 5:

```bash
bragdoc list --last 5
```

### Search

```bash
bragdoc search "migration"
```

### Export

Export your full brag doc:

```bash
bragdoc export
```

Export a specific year:

```bash
bragdoc export --year 2024
```

## Storage

Your brag doc is stored as a simple markdown file at `~/.bragdoc.md`. Human-readable, easy to back up, and yours forever.

## Why keep a brag doc?

You did great work this year. You just forgot 90% of it.

That project you rescued in March? Gone. The junior dev you mentored? Poof. The production incident you fixed at 11pm? Your brain deleted it to make room for Netflix plot lines.

Your manager doesn't remember either — they have 8 other people to think about.

A brag doc fixes this. Write down your wins as they happen. Takes 2 minutes. Do it every Friday.

## Learn more

Visit [bragdoc.io](https://bragdoc.io) to learn more about brag documents and why you should keep one.

## License

MIT

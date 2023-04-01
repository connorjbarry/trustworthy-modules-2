# Reset registry

```typescript
prisma.indivPackage.deleteMany;
prisma.user.deleteMany;
prisma.user.create({
  data: {
    username: "admin",
    password: "admin",
  },
});

prisma.indivpackage.update;
```

## package/id/rate

return the metrics for a singular package

## package/id

return a singular package

## packages

return all packages

## package/byName/name

return a singular package by name

## package/byRegex/regex

return all packages that match the regex

## authenticate

WIP

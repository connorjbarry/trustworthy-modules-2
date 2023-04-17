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

```json
{
  "NetScore": null,
  "RampUp": null,
  "Correctness": null,
  "BusFactor": null,
  "ResponsiveMaintainer": null,
  "LicenseScore": null,
  "GoodPinningPractice": null,
  "GoodEngineeringProcess": null
}
```

## package/id

return a singular package

must return the name version and id, can return either base64 encoded file or the url along with jsprogram. (still not sure what jsprogram does)

## package

this uploads a package, if package exists already it returns id?

## packages

return all packages

return type:

```json
[
  {
    "version": "",
    "name": ""
  },
  {
    "version": "",
    "name": ""
  }
]
```

## package/byName/name

return a singular package by name

## package/byRegex/regex

return all packages that match the regex

## authenticate

WIP

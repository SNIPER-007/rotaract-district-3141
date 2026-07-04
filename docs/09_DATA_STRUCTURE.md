# Data Structure

## Overview
This document defines the future data model for the website. It is documentation only and does not implement any runtime logic.

## Data Modeling Principles
- Keep data normalized.
- Prefer typed reusable entities.
- Make content CMS-friendly.
- Separate presentation from data.
- Allow future API or JSON-based ingestion.

## Core Entities

### District
```ts
interface District {
  id: string;
  name: string;
  districtNumber: string;
  representativeName: string;
  year: string;
  description: string;
  mission: string;
  vision: string;
}
```

### Team Member
```ts
interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  email?: string;
  socialLinks?: SocialLinks;
}
```

### Executive Chair
```ts
interface ExecutiveChair extends TeamMember {
  portfolio?: string;
  responsibilities?: string[];
}
```

### Council Member
```ts
interface CouncilMember extends TeamMember {
  avenue: string;
  responsibilities?: string[];
}
```

### Event
```ts
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  status: "upcoming" | "past" | "featured";
  registrationUrl?: string;
  coverImage?: string;
}
```

### Gallery Image
```ts
interface GalleryImage {
  id: string;
  title: string;
  alt: string;
  src: string;
  category: string;
  eventId?: string;
  photographer?: string;
}
```

### Statistics
```ts
interface Statistic {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  description?: string;
}
```

### Navigation Item
```ts
interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavigationItem[];
}
```

### Contact Information
```ts
interface ContactInformation {
  email: string;
  phone?: string;
  address?: string;
  mapUrl?: string;
}
```

### Social Links
```ts
interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  x?: string;
  youtube?: string;
  website?: string;
}
```

## JSON Example
```json
{
  "district": {
    "id": "3141",
    "name": "Rotaract District 3141",
    "districtNumber": "3141",
    "representativeName": "[District Representative Name]",
    "year": "[District Year]"
  },
  "contact": {
    "email": "[District Email]",
    "address": "[District Address]"
  }
}
```

## Future CMS Structure
A CMS should expose collections such as:
- District settings
- Team members
- Events
- Gallery albums
- Statistics
- Navigation items
- Contact details
- Publications
- Announcements

## Potential API Endpoints
| Endpoint | Purpose |
|---|---|
| `/api/district` | Fetch district metadata |
| `/api/team` | Fetch leadership data |
| `/api/events` | Fetch event listings |
| `/api/gallery` | Fetch gallery media |
| `/api/statistics` | Fetch metrics |
| `/api/navigation` | Fetch site navigation |
| `/api/contact` | Fetch contact details |

## Field Guidelines
- Use stable string IDs.
- Keep dates ISO-formatted.
- Store media metadata with alt text.
- Keep social links optional.
- Separate editor-facing content from presentation-facing fields.

## Scalability Notes
The data model should remain flexible enough to support:
- Archives
- Localization
- Pagination
- Search
- Filtered listings
- CMS syncing
- Static generation or server-side fetching

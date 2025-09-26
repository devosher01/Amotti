// // Domain: Publications
// // Immutable, branded types, no framework imports

// export type PublicationId = string & { readonly __brand: 'PublicationId' };
// export type UserId = string & { readonly __brand: 'UserId' };
// export type DateTimeUTC = string & { readonly __brand: 'DateTimeUTC' }; // ISO 8601 with 'Z'
// export type Platform = 'facebook' | 'instagram';
// export type ContentType = 'post' | 'reel' | 'story';
// export type PublicationStatus = 'draft' | 'scheduled' | 'processing' | 'published' | 'error' | 'cancelled';
// export type PublicationAction = 'draft' | 'publish_now' | 'schedule';

// export type MediaItem = {
//   readonly type: 'image' | 'video' | 'gif' | 'other';
//   readonly url: string;
// };

// export type Content = {
//   readonly id?: string;
//   readonly text: string;
//   readonly media?: readonly MediaItem[];
//   readonly links?: readonly string[];
//   readonly hashtags?: readonly string[];
//   readonly mentions?: readonly string[];
//   readonly contentType: ContentType;
//   readonly metadata?: Readonly<Record<string, unknown>>;
//   readonly createdAt?: DateTimeUTC;
//   readonly updatedAt?: DateTimeUTC;
// };

// export type Publication = {
//   readonly id: PublicationId;
//   readonly userId: UserId;
//   readonly content: Content;
//   readonly platforms: readonly Platform[];
//   readonly status: PublicationStatus;
//   readonly scheduledAt?: DateTimeUTC; // UTC ISO string
//   readonly notes?: readonly string[];
//   readonly createdAt: DateTimeUTC;
//   readonly updatedAt: DateTimeUTC;
// };

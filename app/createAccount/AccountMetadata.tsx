import { account, MetadataAttributeType } from "@lens-protocol/metadata";

export const AccountMetadata = account({
  name: "Jane Doe",
  bio: "I am a photographer based in New York City.",
  picture: "ipfs://bafybeigdyrzt5sfp7udm7hu76u…",
  coverPicture: "ipfs://bafybeihqj6arccj5xiky5jf…",
  attributes: [
    {
      key: "twitter",
      type: MetadataAttributeType.STRING,
      value: "https://twitter.com/qinjiangban",
    },
    {
      key: "dob",
      type: MetadataAttributeType.DATE,
      value: "1990-01-01T00:00:00Z",
    },
    {
      key: "enabled",
      type: MetadataAttributeType.BOOLEAN,
      value: "true",
    },
    {
      key: "height",
      type: MetadataAttributeType.NUMBER,
      value: "1.72",
    },
    {
      key: "settings",
      type: MetadataAttributeType.JSON,
      value: '{"theme": "dark"}',
    },
  ],
});
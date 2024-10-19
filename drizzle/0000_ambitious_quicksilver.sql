CREATE TABLE `transaction_table` (
	`_id` text PRIMARY KEY NOT NULL,
	`note` text NOT NULL,
	`date` integer NOT NULL,
	`amount` real NOT NULL,
	`currency` text NOT NULL,
	`category` text NOT NULL,
	`conversionRate` real DEFAULT 1,
	`group` text,
	`image` text,
	`createdAt` integer DEFAULT (CURRENT_DATE),
	`updatedAt` integer DEFAULT (CURRENT_DATE)
);
--> statement-breakpoint
CREATE TABLE `category_table` (
	`_id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`color` text NOT NULL,
	`icon` text NOT NULL,
	`isFavorite` integer DEFAULT false,
	`createdAt` integer DEFAULT (CURRENT_DATE),
	`updatedAt` integer DEFAULT (CURRENT_DATE)
);

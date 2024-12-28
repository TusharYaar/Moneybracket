CREATE TABLE `category_table` (
	`_id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`color` text NOT NULL,
	`icon` text NOT NULL,
	`description` text DEFAULT '',
	`isFavorite` integer DEFAULT false,
	`createdAt` integer DEFAULT (CURRENT_DATE),
	`updatedAt` integer DEFAULT (CURRENT_DATE)
);
--> statement-breakpoint
CREATE TABLE `group_table` (
	`_id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`color` text NOT NULL,
	`icon` text NOT NULL,
	`description` text DEFAULT '',
	`isFavorite` integer DEFAULT false,
	`createdAt` integer DEFAULT (CURRENT_DATE),
	`updatedAt` integer DEFAULT (CURRENT_DATE)
);
--> statement-breakpoint
CREATE TABLE `transaction_table` (
	`_id` text PRIMARY KEY NOT NULL,
	`note` text DEFAULT '',
	`date` integer NOT NULL,
	`amount` real NOT NULL,
	`currency` text NOT NULL,
	`category` text NOT NULL,
	`conversionRate` real DEFAULT 1,
	`group` text,
	`image` text DEFAULT 'null',
	`createdAt` integer DEFAULT (CURRENT_DATE),
	`updatedAt` integer DEFAULT (CURRENT_DATE)
);

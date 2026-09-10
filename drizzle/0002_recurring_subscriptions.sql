ALTER TABLE `transaction_table` ADD `subscriptionId` text;--> statement-breakpoint
ALTER TABLE `transaction_table` ADD `scheduledFor` integer;--> statement-breakpoint
CREATE UNIQUE INDEX `transaction_subscription_occurrence_unique` ON `transaction_table` (`subscriptionId`,`scheduledFor`);--> statement-breakpoint
CREATE TABLE `subscription_table` (
	`_id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`note` text DEFAULT '',
	`amount` real NOT NULL,
	`currency` text NOT NULL,
	`category` text NOT NULL,
	`conversionRate` real DEFAULT 1,
	`conversionCurrency` text DEFAULT '',
	`group` text,
	`startDate` integer NOT NULL,
	`intervalUnit` text NOT NULL,
	`intervalCount` integer DEFAULT 1 NOT NULL,
	`occurrenceIndex` integer DEFAULT 0 NOT NULL,
	`nextRunAt` integer,
	`endDate` integer,
	`isActive` integer DEFAULT true NOT NULL,
	`createdAt` integer DEFAULT (CURRENT_DATE),
	`updatedAt` integer DEFAULT (CURRENT_DATE)
);

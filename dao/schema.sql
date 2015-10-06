DROP DATABASE IF EXISTS tutor_queue;

CREATE DATABASE tutor_queue;
USE tutor_queue;

--
-- Table structure for Tutor
--
DROP TABLE IF EXISTS `tutor`;
CREATE TABLE `tutor` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(80) NOT NULL,
	PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `tutor` (`name`) VALUES('NO_TUTOR');
UPDATE `tutor` SET `id` = 0 WHERE `name` = 'NO_TUTOR';

--
-- Table structure for help
--
DROP TABLE IF EXISTS `help`;
CREATE TABLE `help` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`tutor_id` int(11) NOT NULL,
	`student_name` varchar(80) NOT NULL,
	`course` varchar(80) NOT NULL,
	`professor` varchar(80),
	`topic` varchar(127),
	`created_timestamp` bigint(11) NOT NULL,
	`resolved_timestamp` bigint(11) NOT NULL,
	KEY `FK_HELP_TUTOR_idx` (`tutor_id`),
	PRIMARY KEY(`id`),
	CONSTRAINT `FK_HELP_TUTOR` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
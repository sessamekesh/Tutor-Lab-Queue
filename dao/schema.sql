DROP DATABASE IF EXISTS tutor_queue;

CREATE DATABASE tutor_queue;
USE tutor_queue;

--
-- Table structure for Student
--
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(80) NOT NULL,
	PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for Tutor
--
DROP TABLE IF EXISTS `tutor`;
CREATE TABLE `tutor` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(80) NOT NULL,
	`Code` int(11) NOT NULL DEFAULT 8888,
	PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for Checkin
--
DROP TABLE IF EXISTS `check_in`;
CREATE TABLE `check_in` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`student_id` int(11) NOT NULL,
	`in_time` int(11),
	`out_time` int(11),
	PRIMARY KEY(`id`),
	KEY `FK_CHECK_IN_STUDENT_idx` (`student_id`),
	CONSTRAINT `FK_CHECK_IN_STUDENT` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for help
--
DROP TABLE IF EXISTS `help`;
CREATE TABLE `help` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`check_in_id` int(11) NOT NULL,
	`tutor_id` int(11) NOT NULL,
	`class` varchar(80) NOT NULL,
	`topic` varchar(127),
	KEY `FK_HELP_CHECK_IN_idx` (`check_in_id`),
	KEY `FK_HELP_TUTOR_idx` (`tutor_id`),
	PRIMARY KEY(`id`),
	CONSTRAINT `FK_HELP_CHECK_IN` FOREIGN KEY (`check_in_id`) REFERENCES `check_in` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `FK_HELP_TUTOR` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
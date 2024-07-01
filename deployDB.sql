-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (x86_64)
--
-- Host: localhost    Database: demo_credit_wallet
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (1,'20230623_create_users_table.ts',1,'2024-06-28 14:45:31'),(2,'20240628161328_create_users_table.ts',2,'2024-06-28 16:14:07');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `account_no` bigint DEFAULT NULL,
  `next_of_kind` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `balance` decimal(14,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Chiedozie','Ramsey','08061167505',8053835011,'Dozie Junior','1960-12-20','chiedozieramsy07@gmail.com','pass123',95950.00,'2024-06-28 17:23:26','2024-06-30 17:01:03'),(2,'Maryann','Lawrence','08062951764',4330744252,'Chiedozie','1970-12-27','maryannlawrence@gmail.com','$2a$10$/P32jFM9bMYE0dAZnTLsuOg4yI3yzrcado3NQRbSTvZmD6ZRcTkhm',1070.00,'2024-06-28 17:59:41','2024-06-29 00:16:15'),(3,'Emeka','Ike','08062998640',6898445577,'Joy Nmadu','1995-12-27','emekaike1@gmail.com','$2a$10$aILw1YmR1.ovTixo2hM.zeuFOt3nx5gNWOaTaKSonwba5YTSE0giC',16800.00,'2024-06-28 18:13:50','2024-06-29 03:22:11'),(4,'Loveth','Kenny','07034598642',4030431612,'Debby Kenny','2005-03-04','lovethkenny@gmail.com','$2a$10$rytFJcP.8cn1l0SGYfgW9.qQikKnjotvOaS3AYZA2OLd6c0Cli7mq',2000.00,'2024-06-28 19:11:37','2024-06-28 21:20:16'),(5,'Peace','Dozie','08061167505',5165685941,'David Dozie','1993-06-04','peacedozie07@gmail.com','$2a$10$eE886yZYWYDhMO8o2RXLQOlfbs5djGGSQEMIOERrYCzkY/IlqdFaG',900.00,'2024-06-28 20:14:27','2024-06-28 21:33:13'),(6,'John','Duru','08061167527',7614639898,'saka joe','1997-07-12','johnduru@gmail.com','$2a$10$QUx9UzcwX47JtzeK9dXOz.0TsAqMIAk2HwNvgcvjeKbG1ATuRD2wa',2200.00,'2024-06-28 20:22:25','2024-06-29 00:08:17'),(7,'Dammy','Benmark','08057167528',7434006581,'pekky yoo','2001-07-07','dammybenmark@gmail.com','$2a$10$L075sI3H9vhIDwhrMcKbAeFGlaS.tlHQPMJs46qIExd7oN1td35t.',13700.00,'2024-06-28 20:24:59','2024-06-29 18:18:46'),(8,'Daniel','Damian','09027167517',8040721618,'Ikech Tobi','2002-09-04','danieldamian@gmail.com','$2a$10$kosshgtLnLYeNrs7f9RH9emhITjOm.blHLa0WUqZ/TAW8wdeAl2BW',1350.00,'2024-06-28 21:49:21','2024-06-29 00:00:11'),(9,'Favour','Hygis','08037167587',9749989274,'Tobish Manae','1994-11-09','favourhygis@gmail.com','$2a$10$msunGTUesW4ollfcbxVdzuRB7FY0an24rJ4gTqPQH9JuePfa6.Px.',4000.00,'2024-06-29 04:11:41','2024-06-29 10:11:58'),(10,'Famous','Kemi','08037167587',6946794390,'Taiwo','1999-01-01','famousekemi@gmail.com','$2a$10$TMiex6ORdDnnFtH0MFW1ZOvmuDhFx5JpRewhqA4496NFwhihzoy/6',0.00,'2024-06-29 04:17:44','2024-06-29 04:17:44'),(11,'Famous','Kemi','08037167587',3729438007,'Taiwo','1999-01-01','famousekemi123@gmail.com','$2a$10$HkxqC8CScpGAYqGWgJp6te/RMbaIE9eoiKlf9PMFpz8o8hRgWt.3u',3300.00,'2024-06-29 04:22:12','2024-06-29 10:20:21'),(12,'Timilayo','Ayomide','09057167575',9467010902,'Taiwo','1993-01-01','timilayoayomide@gmail.com','$2a$10$waMmuqoYy9S8Uf.S4KbmWup6NMkfsrEW19REbQrJ2Z3MDd5NUVBc2',1020.00,'2024-06-29 04:34:31','2024-06-29 18:23:46'),(13,'Doe','Mike','09057167575',6393113016,'Taiwo','1993-01-01','doemioke@gmail.com','$2a$10$8fb0Ov.lgQ7Ls/2DW6QVq.AmYZIfr8kPswa/.RoAG9DQ0YoyWQSWe',5000.00,'2024-06-29 04:36:50','2024-06-29 12:50:10'),(14,'Prince','Docker','09017167573',8648513179,'Emmanuel Docker','1994-05-17','princeDocker24@gmail.com','$2a$10$QCdYpF0mvl/zimv4OL6X2O9IPPut1bvk4mnQl9.UoNr2um6cjF4pC',8100.00,'2024-06-29 09:55:23','2024-06-29 12:47:13'),(15,'Dozie','Ezidiegwu','09017167577',7656023080,'Future wife and children','1995-12-20','dozieezidiegwu24@gmail.com','$2a$10$g9C0Xa/wuCeVRhJ73qW00umh392UfaE6ahzhjjRvxhVFkHehZzSE2',0.00,'2024-06-29 10:57:09','2024-06-29 10:57:09'),(16,'Amake','Ramsey','08017167543',5002394050,'Grace Ramsey','1997-08-27','amakaramsey14@gmail.com','$2a$10$3E77Oe7VTexW9vebApQo1e41dyeXOBrnnZSUKVd7RqBVSmr5Rxy3C',5270.00,'2024-06-29 12:37:45','2024-06-29 18:18:46'),(17,'Joe','Don','08017567543',9037008942,'Iyke','0199-08-06','user@example.com','$2a$10$v1dybnfNscJ3oQ373ljjRO3lzJ03HoG3S6HuQ497JYYG6tYs16QDu',0.00,'2024-06-30 06:16:12','2024-06-30 06:16:12'),(18,'Joe','Don','08017567543',3420536189,'Iyke','0199-08-06','newuser@example.com','$2a$10$m7AFbkSXT6uABQWgJwG8Peo0O2r8TxtQ/lznBLyzKAtTcqd0vAWPe',0.00,'2024-06-30 06:21:01','2024-06-30 06:21:01'),(19,'Chike','Lawrence','08037567577',2849157268,'Dozie Lawrence','1993-11-07','chikelawrence@example.com','$2a$10$aN9PIukfljPWk.edXIATcOhWpM8r/tiZe82gbe3IK8RKqek1NYpkK',1610.00,'2024-06-30 07:30:50','2024-06-30 17:01:03'),(20,'Nonso','Obodo','08023456588',3901778705,'Chucks Obodo','1999-08-04','nonsoobodo@gmail.com','$2a$10$dQUpvjBOM4NXoSqF67bO1O.22iNpX6sNgErO6O6.vTXplo/bX1iIG',0.00,'2024-06-30 17:04:38','2024-06-30 17:04:38');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-01 11:36:56

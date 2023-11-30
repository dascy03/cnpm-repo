CREATE DATABASE  IF NOT EXISTS `printingservice` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `printingservice`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: printingservice
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `print_order`
--

DROP TABLE IF EXISTS `print_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `print_order` (
  `printorderID` int NOT NULL AUTO_INCREMENT,
  `pickupTime` datetime DEFAULT NULL,
  `printTime` datetime DEFAULT NULL,
  `status` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fileName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pickupMethod` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `totalPageUsed` int DEFAULT NULL,
  `printerID` int DEFAULT NULL,
  `userID` int DEFAULT NULL,
  PRIMARY KEY (`printorderID`),
  KEY `print_order_to_printer_idx` (`printerID`),
  KEY `print_order_to_user_idx` (`userID`),
  CONSTRAINT `print_order_to_printer` FOREIGN KEY (`printerID`) REFERENCES `printer` (`printerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `print_order_to_user` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `print_order`
--

LOCK TABLES `print_order` WRITE;
/*!40000 ALTER TABLE `print_order` DISABLE KEYS */;
INSERT INTO `print_order` VALUES (1,'2023-04-23 23:04:59','2023-04-24 13:05:03','Chờ in','computer_networking.pdf','Tự đến lấy',135,1,1),(2,'2023-04-23 23:04:59','2023-04-24 13:05:03','Chờ in','computer_networking.pdf','Tự đến lấy',270,2,1),(3,'2023-04-23 23:04:59','2023-04-24 13:05:03','Chờ in','computer_networking.pdf','Tự đến lấy',540,3,1),(4,'2023-04-23 23:04:59','2023-04-24 13:05:03','Chờ in','computer_networking.pdf','Tự đến lấy',68,4,1),(9,'2023-04-23 13:05:59','2023-04-24 13:05:03','Chờ in','computer_networking.pdf','Tự đến lấy',270,4,1),(10,'2023-04-23 13:05:59','2023-04-24 23:50:03','Chờ in','computer_networking.pdf','Tự đến lấy',270,4,1),(11,'2023-04-23 13:05:59','2023-04-24 10:50:03','Chờ in','computer_networking.pdf','Tự đến lấy',270,4,1),(12,'2023-04-23 13:05:59','2023-04-24 10:50:03','Chờ in','computer_networking.pdf','Tự đến lấy',270,3,1),(13,'2023-04-23 13:05:59','2023-04-24 11:50:03','Chờ in','BTL_AP.pdf','Tự đến lấy',26,3,1),(14,'2023-04-23 13:05:59','2023-04-24 11:30:03','Chờ in','BTL_AP.pdf','Tự đến lấy',13,3,1);
/*!40000 ALTER TABLE `print_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `printer`
--

DROP TABLE IF EXISTS `printer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `printer` (
  `printerID` int NOT NULL AUTO_INCREMENT,
  `model` varchar(45) NOT NULL,
  `location` varchar(45) DEFAULT 'CS2 - Lầu 6',
  `status` varchar(45) DEFAULT 'Đang hoạt động',
  `pageBalance` int DEFAULT '300',
  PRIMARY KEY (`printerID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `printer`
--

LOCK TABLES `printer` WRITE;
/*!40000 ALTER TABLE `printer` DISABLE KEYS */;
INSERT INTO `printer` VALUES (1,'P1 - Lầu 6','CS2 - Lầu 6','Đang hoạt động',300),(2,'P1 - Lầu 5','CS2 - Lầu 5','Đang hoạt động',300),(3,'P1 - Lầu 4','CS2 - Lầu 4','Đang hoạt động',300),(4,'P1 - Lầu 3','CS2 - Lầu 3','Đang hoạt động',300),(5,'P5 - Lầu 2','CS2 - Lầu 2','Đang hoạt động',300);
/*!40000 ALTER TABLE `printer` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_delete_printer` BEFORE DELETE ON `printer` FOR EACH ROW BEGIN
    IF OLD.status = 'Đang hoạt động' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Không thể xoá máy in đang hoạt động';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `spso`
--

DROP TABLE IF EXISTS `spso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spso` (
  `spsoID` int NOT NULL,
  PRIMARY KEY (`spsoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spso`
--

LOCK TABLES `spso` WRITE;
/*!40000 ALTER TABLE `spso` DISABLE KEYS */;
INSERT INTO `spso` VALUES (1),(2);
/*!40000 ALTER TABLE `spso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `DoB` date DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `pageBalance` decimal(10,0) DEFAULT NULL,
  `avtLink` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John Doe','1990-01-15','0906112789','123 Main St','john.doe@example.com','hashedpassword1','Active',100,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0fD8K3vn_KC4vBp8VBb1tWYomAQEDsF_MFw&usqp=CAU'),(2,'Jane Smith','1985-03-22','0906112789','456 Oak St','jane.smith@example.com','hashedpassword2','Inactive',75,'https://static-00.iconduck.com/assets.00/female-avatar-illustration-2048x2048-5c2az6ba.png'),(3,'Alice Johnson','1992-08-10','0906112789','789 Pine St','alice.johnson@example.com','hashedpassword3','Active',120,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ1W5fo9cGyQcxSyBPgv3xgDbodrfkXyBpWw&usqp=CAU'),(4,'Bob Williams','1988-05-18','0906112789','101 Maple Ave','bob.williams@example.com','hashedpassword4','Active',90,'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png'),(5,'Emily Davis','1995-11-30','0906112789','202 Birch St','emily.davis@example.com','hashedpassword5','Inactive',60,'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043251-avatar-female-girl-woman_113291.png'),(6,'Michael Brown','1982-04-05','0906112789','303 Cedar St','michael.brown@example.com','hashedpassword6','Active',150,'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg'),(7,'Zoe Miller','1993-09-12','0906112789','404 Oak St','zoe.miller@example.com','hashedpassword7','Inactive',80,'https://www.terrainhopperusa.com/wp-content/uploads/2019/01/avatar-woman.png'),(8,'Daniel White','1987-02-25','0906112789','505 Pine St','daniel.white@example.com','hashedpassword8','Active',110,'https://cdn2.iconfinder.com/data/icons/fashion-1-5/48/32-512.png'),(9,'Sophia Taylor','1994-07-07','0906112789','606 Elm St','sophia.taylor@example.com','hashedpassword9','Active',130,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfpU1SBOIBNYiGKh4dETJ0XUOTa99Xhxqqjg&usqp=CAU'),(10,'Ethan Davis','1991-06-20','0906112789','707 Maple Ave','ethan.davis@example.com','hashedpassword10','Inactive',95,'https://cdn.icon-icons.com/icons2/2859/PNG/512/avatar_face_girl_female_woman_profile_smiley_happy_people_icon_181662.png'),(11,'Olivia Smith','1984-03-14','0906112789','808 Birch St','olivia.smith@example.com','hashedpassword11','Active',115,'https://e7.pngegg.com/pngimages/956/783/png-clipart-computer-icons-female-youtube-woman-avatar-business-woman-face-black-hair-thumbnail.png'),(12,'Noah Johnson','1996-10-05','0906112789','909 Cedar St','noah.johnson@example.com','hashedpassword12','Inactive',70,'https://cdn1.iconfinder.com/data/icons/business-avatar-circle/64/26_avatar_people_business_businesswoman_woman_female_long_hair-512.png'),(13,'Ava Williams','1989-07-28','0906112789','1010 Elm St','ava.williams@example.com','hashedpassword13','Active',125,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm6smRPXPiHDsytMi7pXb3uZyi38_tK6UJWg&usqp=CAU'),(14,'Liam Brown','1997-02-09','0906112789','1111 Oak St','liam.brown@example.com','hashedpassword14','Active',135,'https://static.vecteezy.com/system/resources/previews/024/183/535/original/male-avatar-portrait-of-a-young-man-with-glasses-illustration-of-male-character-in-modern-color-style-vector.jpg'),(15,'Emma Davis','1983-08-23','0906112789','1212 Pine St','emma.davis@example.com','hashedpassword15','Inactive',85,'https://img.freepik.com/premium-vector/man-character_665280-46970.jpg'),(16,'Mason White','1990-01-15','0906112789','1313 Maple Ave','mason.white@example.com','hashedpassword16','Active',105,'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg'),(17,'Isabella Taylor','1985-04-07','0906112789','1414 Birch St','isabella.taylor@example.com','hashedpassword17','Inactive',65,'https://png.pngtree.com/png-clipart/20190705/original/pngtree-man-avatar-icon-professional-man-character-png-image_4356027.jpg'),(18,'James Miller','1992-09-20','0906112789','1515 Cedar St','james.miller@example.com','hashedpassword18','Active',145,'https://cdn0.iconfinder.com/data/icons/avatar-78/128/3-512.png'),(19,'Grace Brown','1986-05-18','0906112789','1616 Elm St','grace.brown@example.com','hashedpassword19','Inactive',75,'https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg'),(20,'Benjamin Johnson','1993-11-30','0906112789','1717 Oak St','benjamin.johnson@example.com','hashedpassword20','Active',95,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5IXhKUjSU4XaJVQx6elmvvPNiexjJAP9Jmg&usqp=CAU');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'printingservice'
--

--
-- Dumping routines for database 'printingservice'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-30 22:44:51

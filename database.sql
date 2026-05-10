-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: dbsproj
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'Admin One','admin1','admin1@email.com','adminpass1'),(2,'Admin Two','admin2','admin2@email.com','adminpass2'),(3,'Admin Three','admin3','admin3@email.com','adminpass3'),(4,'Super Admin','admin','admin@email.com','admin123');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Beverages'),(3,'Desserts'),(1,'Fast Food');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact` varchar(20) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Ali Khan','Karachi','ali123','ali@email.com','pass123','03001234567'),(2,'Sara Ahmed','Lahore','sara456','sara@email.com','pass456','03111234567'),(3,'Usman Tariq','Islamabad','usman789','usman@email.com','pass789','03211234567'),(5,'Saahil Ghulam Mohammad','ndioASNOIN','burgerfries','saahilghulammohammad@gmail.com','hibye','03333025215'),(6,'Misbah','bahria town','misbah','dcspcmkld@gmail.com','1234','03333025215'),(7,'abdurrehman','fast','abdurrehman','k240570@nu.edu.pk','pass1','03333025215');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery`
--

DROP TABLE IF EXISTS `delivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery` (
  `delivery_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `deliveryguy_id` int DEFAULT NULL,
  `deliverystatus` varchar(50) NOT NULL,
  `delivery_time` datetime DEFAULT NULL,
  PRIMARY KEY (`delivery_id`),
  KEY `order_id` (`order_id`),
  KEY `deliveryguy_id` (`deliveryguy_id`),
  CONSTRAINT `delivery_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `delivery_ibfk_2` FOREIGN KEY (`deliveryguy_id`) REFERENCES `deliveryguy` (`deliveryguy_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery`
--

LOCK TABLES `delivery` WRITE;
/*!40000 ALTER TABLE `delivery` DISABLE KEYS */;
INSERT INTO `delivery` VALUES (2,2,2,'completed','2026-04-30 12:35:54'),(3,3,3,'completed','2026-04-30 12:36:19'),(9,9,1,'completed','2026-04-30 12:11:25'),(10,10,1,'completed','2026-04-30 12:13:51'),(11,31,2,'completed','2026-05-06 21:01:02'),(12,32,3,'assigned',NULL),(13,33,1,'completed','2026-05-08 18:24:33'),(14,30,2,'completed','2026-05-06 21:01:01'),(15,29,3,'assigned',NULL),(16,23,1,'completed','2026-05-08 18:24:20'),(17,34,2,'completed','2026-05-06 20:58:53'),(18,35,3,'assigned',NULL),(19,38,1,'assigned',NULL),(20,37,2,'assigned',NULL),(21,39,3,'assigned',NULL),(22,40,1,'assigned',NULL),(23,41,2,'assigned',NULL);
/*!40000 ALTER TABLE `delivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveryguy`
--

DROP TABLE IF EXISTS `deliveryguy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliveryguy` (
  `deliveryguy_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact` varchar(20) NOT NULL,
  PRIMARY KEY (`deliveryguy_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveryguy`
--

LOCK TABLES `deliveryguy` WRITE;
/*!40000 ALTER TABLE `deliveryguy` DISABLE KEYS */;
INSERT INTO `deliveryguy` VALUES (1,'Rider One','rider1','rider1@email.com','pass1','03331234567'),(2,'Rider Two','rider2','rider2@email.com','pass2','03441234567'),(3,'Rider Three','rider3','rider3@email.com','pass3','03551234567');
/*!40000 ALTER TABLE `deliveryguy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menuitems`
--

DROP TABLE IF EXISTS `menuitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menuitems` (
  `menu_item_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int NOT NULL,
  `imageurl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`menu_item_id`),
  UNIQUE KEY `uniquename` (`name`),
  KEY `fkcategory` (`category_id`),
  CONSTRAINT `fkcategory` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menuitems`
--

LOCK TABLES `menuitems` WRITE;
/*!40000 ALTER TABLE `menuitems` DISABLE KEYS */;
INSERT INTO `menuitems` VALUES (1,'Zinger Burger',109,500.00,1,'https://www.shutterstock.com/image-photo/zinger-burger-fried-chicken-cheese-260nw-2395281569.jpg'),(2,'Coke',13,120.00,2,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4KORCb523bUi0I5xGNGC88fMfw5YLdSrxCw&s'),(3,'Chocolate Cake',149,300.00,3,'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/easy_chocolate_cake_31070_16x9.jpg'),(7,'Fries',96,120.00,1,NULL);
/*!40000 ALTER TABLE `menuitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitems`
--

DROP TABLE IF EXISTS `orderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitems` (
  `order_id` int NOT NULL,
  `menu_item_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`order_id`,`menu_item_id`),
  KEY `menu_item_id` (`menu_item_id`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menuitems` (`menu_item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderitems_chk_1` CHECK ((`quantity` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitems`
--

LOCK TABLES `orderitems` WRITE;
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
INSERT INTO `orderitems` VALUES (2,2,3),(3,3,1),(9,2,27),(10,1,1),(10,3,5),(11,2,1),(11,3,1),(12,2,50),(13,3,2),(14,1,2),(15,3,1),(16,2,1),(17,2,5),(20,1,1),(21,1,1),(21,3,1),(22,1,1),(22,3,2),(23,2,2),(23,3,4),(24,1,2),(25,2,1),(25,3,1),(26,1,1),(27,7,3),(28,1,10),(29,1,1),(29,7,1),(30,1,3),(31,1,1),(31,3,1),(32,1,1),(33,1,1),(33,2,1),(34,2,1),(34,3,1),(35,1,1),(35,2,1),(36,3,1),(37,1,3),(38,1,5),(39,1,5),(40,1,3),(41,1,1);
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total_bill` decimal(10,2) NOT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,2,'2026-04-01 07:36:53',0.00,'completed'),(3,3,'2026-04-01 07:36:53',0.00,'completed'),(9,6,'2026-04-16 10:20:13',3240.00,'completed'),(10,6,'2026-04-16 10:25:47',2000.00,'completed'),(11,6,'2026-04-21 06:48:27',420.00,'completed'),(12,6,'2026-04-21 06:51:02',6000.00,'completed'),(13,5,'2026-04-21 06:52:00',600.00,'completed'),(14,5,'2026-04-21 06:52:32',1000.00,'completed'),(15,5,'2026-04-23 05:17:57',300.00,'completed'),(16,6,'2026-04-23 05:35:06',120.00,'completed'),(17,6,'2026-04-23 05:35:47',600.00,'completed'),(19,5,'2026-04-23 08:16:45',100.00,'completed'),(20,6,'2026-04-30 06:11:18',500.00,'completed'),(21,5,'2026-04-30 07:32:04',800.00,'pending'),(22,6,'2026-04-30 07:32:45',1100.00,'pending'),(23,6,'2026-04-30 07:33:15',1440.00,'delivered'),(24,6,'2026-04-30 07:42:43',1000.00,'pending'),(25,6,'2026-04-30 07:42:54',420.00,'pending'),(26,6,'2026-04-30 07:43:09',500.00,'pending'),(27,6,'2026-04-30 07:43:21',360.00,'pending'),(28,6,'2026-04-30 08:36:21',5000.00,'pending'),(29,5,'2026-04-30 09:18:52',620.00,'preparing'),(30,6,'2026-04-30 09:39:20',1500.00,'delivered'),(31,6,'2026-04-30 10:12:06',800.00,'delivered'),(32,7,'2026-05-04 09:55:00',500.00,'delivered'),(33,7,'2026-05-06 15:04:29',620.00,'delivered'),(34,7,'2026-05-06 15:58:22',420.00,'delivered'),(35,6,'2026-05-08 13:23:27',620.00,'preparing'),(36,7,'2026-05-10 14:07:56',300.00,'pending'),(37,7,'2026-05-10 15:13:26',1500.00,'preparing'),(38,7,'2026-05-10 15:14:55',2500.00,'preparing'),(39,7,'2026-05-10 15:16:28',2500.00,'preparing'),(40,7,'2026-05-10 15:20:33',1500.00,'preparing'),(41,7,'2026-05-10 15:24:42',500.00,'preparing');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-11  0:01:37

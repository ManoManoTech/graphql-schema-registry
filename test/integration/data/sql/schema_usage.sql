-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: schema_registry
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `version` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`version`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (12,'local-test-microservice','1.2.3'),(66,'local-test-microservice','1.3.0');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `container_schema`
--

DROP TABLE IF EXISTS `container_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `container_schema` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `service_id` int unsigned NOT NULL,
  `schema_id` int unsigned NOT NULL,
  `version` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `added_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `service_id` (`service_id`,`version`),
  KEY `schema_id` (`schema_id`),
  CONSTRAINT `container_schema_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `container_schema_ibfk_2` FOREIGN KEY (`schema_id`) REFERENCES `schema` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `container_schema`
--

LOCK TABLES `container_schema` WRITE;
/*!40000 ALTER TABLE `container_schema` DISABLE KEYS */;
INSERT INTO `container_schema` VALUES (2,3,2,'latest','2022-05-27 14:46:09'),(3,4,3,'latest','2022-05-27 14:46:11'),(4,5,4,'latest','2022-05-27 14:46:12'),(5,6,5,'latest','2022-05-27 14:46:14'),(6,7,6,'latest','2022-05-27 14:46:15'),(7,8,7,'latest','2022-05-27 14:46:16'),(8,9,8,'latest','2022-05-27 14:46:17'),(9,10,9,'latest','2022-05-27 14:46:19'),(10,11,10,'latest','2022-05-27 14:46:20'),(11,12,11,'latest','2022-05-27 14:46:21'),(12,13,12,'latest','2022-05-27 14:46:22'),(13,14,13,'latest','2022-05-27 14:46:24');
/*!40000 ALTER TABLE `container_schema` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (1,'00_init.sql',1,'2022-05-27 14:45:07'),(2,'20200908225857_increase_typedefs_limit.sql',1,'2022-05-27 14:45:07'),(3,'20210522225999_add_service_url.sql',1,'2022-05-27 14:45:07'),(4,'20220506135000_schema_breakdown_ddl.sql',1,'2022-05-27 14:45:08'),(5,'20220523647902_schema_usage_ddl.sql',1,'2022-05-27 14:45:08');
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
-- Table structure for table `persisted_queries`
--

DROP TABLE IF EXISTS `persisted_queries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persisted_queries` (
  `key` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `query` text COLLATE utf8mb4_general_ci NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `updated_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `added_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persisted_queries`
--

LOCK TABLES `persisted_queries` WRITE;
/*!40000 ALTER TABLE `persisted_queries` DISABLE KEYS */;
/*!40000 ALTER TABLE `persisted_queries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema`
--

DROP TABLE IF EXISTS `schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schema` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `service_id` int unsigned DEFAULT NULL,
  `is_active` tinyint DEFAULT '1' COMMENT 'If schema is deleted, this is set to 0',
  `type_defs` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Graphql schema definition for specific service',
  `added_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time of first registration',
  `updated_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time of last registration OR deactivation',
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `schema_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema`
--

LOCK TABLES `schema` WRITE;
/*!40000 ALTER TABLE `schema` DISABLE KEYS */;
INSERT INTO `schema` VALUES (2,3,1,'schema {\n  query: Query\n}\n\nenum CacheControlScope {\n  PUBLIC\n  PRIVATE\n}\n\ndirective @cacheControl(\n  maxAge: Int\n  scope: CacheControlScope\n  inheritMaxAge: Boolean\n) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION\n\ndirective @extends on INTERFACE | OBJECT\n\ndirective @external on FIELD_DEFINITION | OBJECT\n\ndirective @key(fields: String!) on INTERFACE | OBJECT\n\ndirective @provides(fields: String!) on FIELD_DEFINITION\n\ndirective @requires(fields: String!) on FIELD_DEFINITION\n\ntype Brand @cacheControl(maxAge: 240) @key(fields: \"id\") @key(fields: \"brandId\") @key(fields: \"id market platform\") @key(fields: \"brandId market platform\") {\n  brandId: Int!\n  description: String\n  id: ID!\n  logo: String\n  market: Market!\n  platform: Platform!\n  slug: String!\n  testFieldWithArguments(fieldArgument1: Float!, fieldArgument2: Float!): String\n  title: String!\n}\n\nenum Market {\n  B2B\n  B2C\n}\n\nenum Platform {\n  DE\n  ES\n  FR\n  GB\n  IT\n}\n\ntype Query {\n  _entities(representations: [_Any!]!): [_Entity]!\n  _service: _Service!\n  brand(brandId: Int!, market: Market!, platform: Platform!): Brand!\n  brands(brandIds: [Int!]!, market: Market!, platform: Platform!): [Brand!]!\n}\n\nscalar _Any\n\nunion _Entity = Brand\n\ntype _Service {\n  \"\"\"The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied\"\"\"\n  sdl: String\n}\n','2022-05-27 14:46:09','2022-05-27 12:46:09'),(3,4,1,'\n  type Query {\n    tipsheet(id: Int!): Tipsheet\n}\n\n\ntype TipsheetPicture {\n    url: String!\n    path:String!\n}\n\ntype Tipsheet @key(fields: \"id\") {\n    id: Int!\n    title: String!\n    platform: Platform!\n    body: String!\n    leadParagraph: String\n    visible: Boolean!\n    categoryId:Int!\n    categories:[Int]!\n    slug: String\n    picture: TipsheetPicture!\n    categoryPicture: TipsheetPicture!\n    buttonText:String!\n    buttonUrl:String!\n    author:Int!\n    features:[String]!\n}\n\nenum Platform {\n    DE\n    ES\n    FR\n    GB\n    IT\n}\n\ndirective @extends on INTERFACE | OBJECT\ndirective @external on FIELD_DEFINITION | OBJECT\ndirective @key(fields: String!) on INTERFACE | OBJECT\ndirective @requires(fields: String!) on FIELD_DEFINITION\n\n','2022-05-27 14:46:11','2022-05-27 12:46:10'),(4,5,1,'\n  schema {\n  query: Query\n}\n\ndirective @extends on INTERFACE | OBJECT\n\ndirective @external on FIELD_DEFINITION | OBJECT\n\ndirective @key(fields: String!) on INTERFACE | OBJECT\n\ndirective @provides(fields: String!) on FIELD_DEFINITION\n\ndirective @requires(fields: String!) on FIELD_DEFINITION\n\ntype Brand @extends @key(fields: \"brandId market platform\") {\n  brandId: Int! @external\n  market: Market! @external\n  platform: Platform! @external\n}\n\nenum Market {\n  B2B\n  B2C\n}\n\nenum Platform {\n  DE\n  ES\n  FR\n  GB\n  IT\n}\n\ntype Query {\n  _entities(representations: [_Any!]!): [_Entity]!\n  _service: _Service!\n  \"\"\"homepageB2cBrands is now deprecated\"\"\"\n  homepageB2cBrands(platform: Platform!): [Brand!]! @deprecated(reason: \"Add nullability. Use query homepageB2cBrandsV1 instead. Removal on 2023-01-10\")\n  homepageB2cBrandsV1(platform: Platform!): [Brand!]\n  \"\"\"homepageB2cTipsheets is now deprecated\"\"\"\n  homepageB2cTipsheets(platform: Platform!): [Tipsheet!]! @deprecated(reason: \"Add nullability. Use query homepageB2cTipsheetsV1 instead. Removal on 2023-01-10\")\n  homepageB2cTipsheetsV1(platform: Platform!): [Tipsheet!]\n}\n\ntype Tipsheet @extends @key(fields: \"id\") {\n  id: Int! @external\n}\n\nscalar _Any\n\nunion _Entity = Brand | Tipsheet\n\ntype _Service {\n  \"\"\"The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied\"\"\"\n  sdl: String\n}\n\n','2022-05-27 14:46:12','2022-05-27 12:46:12'),(5,6,1,'\n  type Mutation {\n    updateCustomerSegments(updateCustomerSegmentsInput: UpdateCustomerSegmentsInput!): UpdateCustomerSegmentsPayload\n}\n\ninput UpdateCustomerSegmentsInput {\n    clientMutationId: String,\n    b2bWelcome: Boolean\n}\n\ntype UpdateCustomerSegmentsPayload {\n    clientMutationId: String,\n    customerSegments: CustomerSegments\n}\n\ntype CustomerSegments {\n    profile: String, \n    b2bScore: Int,\n    deferredPayment: String,\n    cluster: String\n    b2bIntention: String,\n    b2bSuspectedPro: String,\n    favoriteBrands: [Int],\n    favoriteCategories: [Int],\n    b2bWelcome: Boolean,\n    preferredAdviceContactChannel: String\n}\n\n\n','2022-05-27 14:46:14','2022-05-27 12:46:13'),(6,7,1,'type Query { loyaltyProgramRewardStatus(platform: Platform!): LoyaltyProgramRewardStatus } type LoyaltyProgramRewardStatus { amountAchieved: Float amountTarget: Float } enum Platform { FR ES IT DE GB }','2022-05-27 14:46:15','2022-05-27 12:46:14'),(7,8,1,'schema { query: Query } type ModelAttributes @key(fields: \"modelId platform\") { modelId: Int! platform: Platform! isCompetitive: Boolean isBestQualityOffer: Boolean commercialOperations: [Int!] } type Query { modelAttributes(modelIds:[Int!], platform: Platform!) : [ModelAttributes!] } enum Platform { FR ES IT DE GB }','2022-05-27 14:46:16','2022-05-27 12:46:16'),(8,9,1,'type Query { loyaltyCoupons(platform: Platform!): [Coupon] } type Coupon { code: ID!, value: Float!, creationDate: String!, expirationDate: String! } enum Platform { FR ES IT DE GB }','2022-05-27 14:46:17','2022-05-27 12:46:17'),(9,10,1,'directive @extends on INTERFACE | OBJECT directive @external on FIELD_DEFINITION | OBJECT directive @key(fields: String!) on INTERFACE | OBJECT directive @provides(fields: String!) on FIELD_DEFINITION directive @requires(fields: String!) on FIELD_DEFINITION type Query { activeProBanner(platform: Platform!): ProBanner proOffers(platform: Platform!): [ProOffer] proBrands(platform: Platform!): [Brand] } type ProBanner { id: ID! title: String! text: String! textColor: String! buttonText: String! buttonTextColor: String! buttonBackgroundColor: String! link: String! relativeLink: String! appLink: String startDate: String! endDate: String! imageUrl: String! mobileImageUrl: String! appImageUrl: String! campaignName: String! } type ProOffer { title: String! link: String! relativeLink: String! appLink: String block: Int! line: Int! order: Int! imageUrl: String! mobileImageUrl: String! } type Brand @extends @key(fields: \"brandId market platform\"){ brandId: Int! @external market: Market! @external platform: Platform! @external } enum Market { B2C B2B } enum Platform { FR ES IT DE GB }','2022-05-27 14:46:19','2022-05-27 12:46:18'),(10,11,1,'directive @external on FIELD_DEFINITION | OBJECT directive @key(fields: String!) on INTERFACE | OBJECT type Query { category(platform:Platform!,categoryId:Int!): Category! } type Category @key(fields: \"categoryId platform\") { categoryId: Int! level: Int! image: String platform: Platform! name: String! slug: String! display: Boolean! children: [RelatedCategory!]! ancestors: [RelatedCategory!]! } type RelatedCategory { categoryId: Int! level: Int! image: String name: String! slug: String! display: Boolean! } enum Platform { DE ES FR GB IT }','2022-05-27 14:46:20','2022-05-27 12:46:19'),(11,12,1,'schema { query: Query } directive @extends on INTERFACE | OBJECT directive @external on FIELD_DEFINITION | OBJECT directive @key(fields: String!) on INTERFACE | OBJECT directive @provides(fields: String!) on FIELD_DEFINITION directive @requires(fields: String!) on FIELD_DEFINITION type CampaignImage { height: Int! url: String! width: Int! } \"\"\"Data received from datasource. Check PromotionCampaign.targets field.\"\"\" type CampaignTarget { level0Id: Float level0Name: String level1Id: Float level1Name: String pageName: String position: Float } type FederatedPromotionCampaigns @key(fields: \"space market platform\") { campaigns: [PromotionCampaign!]! market: Market! platform: Platform! space: Space! } enum Market { B2B B2C } enum Platform { DE ES FR GB IT } type PromotionCampaign @key(fields: \"uuid\") { creativeDesktop: CampaignImage creativeMobile: CampaignImage description: String endDate: Int market: Market! name: String! platform: Platform! redirectionUrl: String space: Space! startDate: Int target: CampaignTarget uuid: String! } type Query { _entities(representations: [_Any!]!): [_Entity]! _service: _Service! campaigns(market: Market!, platform: Platform!, space: Space!): [PromotionCampaign!] federatedCampaigns(market: Market!, platform: Platform!, space: Space!): FederatedPromotionCampaigns! } enum Space { appHomepageB2cMainPromotion bottomBanner homepageB2CMainPromotion homepageB2CSecondaryPromotion middleBanner ongletBanner topBanner } scalar _Any union _Entity = FederatedPromotionCampaigns | PromotionCampaign type _Service { \"\"\"The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied\"\"\" sdl: String }','2022-05-27 14:46:21','2022-05-27 12:46:21'),(12,13,1,'type Query { searchProduct(platform:Platform!,market:Market!,article_id:BigInteger,model_id:BigInteger,product_id:BigInteger):Product } type Product @key(fields: \"platform is_pro article_id model_id product_id\") { platform: Platform! is_pro: Boolean! article_id: BigInteger model_id: BigInteger product_id: BigInteger masterProduct: MasterProduct! sku: Sku offer: Offer } type MasterProduct { article_id: BigInteger! master_product_id: BigInteger is_indexable: Boolean! category_id: Int! brand: Brand! category: Category! is_top_sale: Boolean! } type Sku { model_id:Int! mm_id: BigInteger title: String! media: [Media]! description: Description reference: String! is_available_in_pro: Boolean! variants: VariantWrapper rating: Rating! attributes: [CatalogAttribute] slug_article: String is_pro_product: Boolean! manufacturer_sku: String ean: String repairability_index: Float } type Offer { product_id:Int! offer_id: String is_for_sale: Boolean! sku: String warranty: String stock: Stock price: Price! delivery: Delivery! seller: Seller! related_sellers: Int! is_best_offer: Boolean! unit_count: BigDecimal unit_count_type: String } type Brand @key(fields: \"brandId market platform\") @extends { brandId: Int! @external, platform: Platform! @external, market: Market! @external } type Category @key(fields: \"categoryId platform\") @extends { categoryId: Int! @external, platform: Platform! @external } type Media { regular_url: String thumbnail_url: String large_url: String } type Description { specification_url: String text: String } type VariantWrapper { is_legacy: Boolean! data: [VariantInterface]! } interface VariantInterface { model_id: Int! } type Variant implements VariantInterface { model_id: Int! mm_id: BigInteger! attributes: [AttributeVariant]! } type AttributeVariant { id: BigInteger! type: String! name: String value_type: String! value: [AttributeValue]! unit: AttributeUnit order: Int! } type AttributeValue { data: Object image_url: String color_hex: String } type AttributeUnit { id: Int name: String description: String abbreviation: String display_abbreviation: Boolean } type AvailableModelReference implements VariantInterface { model_id: Int! description: String is_product_b2b: Boolean! } type Rating { total_ratings: Int! average: Float! } type CatalogAttribute { attribute: Attribute value: String unit: String } type Attribute { id: Int name: String } type Stock { total_stock: Int! stock_available_in_weeks: Int! stock_minimum_value: Int! increase_quantity: Int! } type Price { currency: Currency! retail_price: PriceDetail eco_participation_with_vat: BigDecimal current_price: CurrentPrice measurement_price: MeasurementPrice discount_percentage_for_primary_price: Int measurement_price_is_primary_price: Boolean! is_payment3x_activated: Boolean! } enum Currency { EUR GBP } type PriceDetail { vat_rate: BigDecimal! amount_with_vat: BigDecimal! amount_without_vat: BigDecimal! } type CurrentPrice { vat_rate: BigDecimal! amount_with_vat: BigDecimal! amount_without_vat: BigDecimal! } type MeasurementPrice { vat_rate: BigDecimal! amount_with_vat: BigDecimal! amount_without_vat: BigDecimal! measurement_unit: String! } type Delivery { delivery_expenses: String is_fulfillment: Boolean! weight: Float warehouse_id: Int } type Seller { id: Int! country: String name: String url: String } enum Platform { DE ES FR GB IT } enum Market { B2C B2B } scalar BigInteger scalar BigDecimal scalar Object directive @extends on INTERFACE | OBJECT directive @external on FIELD_DEFINITION | OBJECT directive @key(fields: String!) repeatable on INTERFACE | OBJECT directive @requires(fields: String!) on FIELD_DEFINITION','2022-05-27 14:46:22','2022-05-27 12:46:22'),(13,14,1,'schema { query: Query } directive @extends on INTERFACE | OBJECT directive @external on FIELD_DEFINITION | OBJECT directive @key(fields: String!) on INTERFACE | OBJECT directive @provides(fields: String!) on FIELD_DEFINITION directive @requires(fields: String!) on FIELD_DEFINITION enum ABTestPool { aaa aab aba abb baa bab bba bbb } \"\"\"The `BigInteger` scalar type represents non-fractional signed whole numeric values. BigInteger can represent values larger than -(2^53) + 1 and 2^53 - 1. \"\"\" scalar BigInteger enum DisplayType { bundle categoryList productList } type Engine @key(fields: \"engineName\") { categoryIds: [Int!] displayAddToCartButton: Boolean \"\"\"Type of display\"\"\" displayType: String! \"\"\"Same data as in displayType field but in enum. No dashes \"-\" allowed.\"\"\" displayTypeEnum: DisplayType! \"\"\"Unique identification name of the engine\"\"\" engineName: ID! \"\"\"Internationalized name of the engine\"\"\" name: String! products: [Product] } enum Market { B2B B2C } enum Platform { DE ES FR GB IT } type Product @extends { article_id: BigInteger @external is_pro: Boolean! @external model_id: BigInteger @external platform: Platform! @external product_id: BigInteger @external } type Query { _entities(representations: [_Any!]!): [_Entity]! _service: _Service! recommendationEngines( abtestPools: ABTestPool! categoryId: Int categoryIds: [Int!] isPro: Boolean! \"\"\"Limit the first n products. A negative number will return last n products. Default is 10.\"\"\" limit: Int = 10 market: Market! modelId: BigInteger modelIds: [BigInteger!] pageType: String! platformId: Platform! productId: BigInteger productIds: [BigInteger!] ): [Engine!] } scalar _Any union _Entity = Engine type _Service { \"\"\"The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied\"\"\" sdl: String }','2022-05-27 14:46:24','2022-05-27 12:46:23');
/*!40000 ALTER TABLE `schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `is_active` int NOT NULL DEFAULT '1',
  `updated_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `added_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Url for a specific service',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (3,'brands',1,NULL,'2022-05-27 12:46:09','http://127.0.0.1:4003/api/graphql/brands'),(4,'tipsheets',1,NULL,'2022-05-27 12:46:10','http://127.0.0.1:4500/api/graphql/tipsheets'),(5,'homepage-b2c',1,NULL,'2022-05-27 12:46:12','http://127.0.0.1:4001/api/graphql/homepage-b2c'),(6,'customer-segment',1,NULL,'2022-05-27 12:46:13','http://127.0.0.1:4000/api/graphql/customer-segment'),(7,'loyalty-program',1,NULL,'2022-05-27 12:46:14','http://127.0.0.1:4004/api/graphql/loyalty-program'),(8,'enrichment-product',1,NULL,'2022-05-27 12:46:16','http://127.0.0.1:4010/api/graphql/enrichment-product'),(9,'coupons',1,NULL,'2022-05-27 12:46:17','http://127.0.0.1:4004/api/graphql/copupons'),(10,'cockpit-b2b',1,NULL,'2022-05-27 12:46:18','http://127.0.0.1:4003/api/graphql/cockpit-b2b'),(11,'categories',1,NULL,'2022-05-27 12:46:19','http://127.0.0.1:4011/api/graphql/categories'),(12,'campaigns',1,NULL,'2022-05-27 12:46:21','http://127.0.0.1:4005/api/graphql/campaigns'),(13,'products',1,NULL,'2022-05-27 12:46:22','http://127.0.0.1:4007/api/graphql/products'),(14,'recommendation',1,NULL,'2022-05-27 12:46:23','http://127.0.0.1:4006/api/graphql/recommendation');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_def_field_arguments`
--

DROP TABLE IF EXISTS `type_def_field_arguments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_def_field_arguments` (
  `field_id` int unsigned DEFAULT NULL,
  `argument_id` int unsigned DEFAULT NULL,
  UNIQUE KEY `field_id` (`field_id`,`argument_id`),
  KEY `argument_id` (`argument_id`),
  CONSTRAINT `type_def_field_arguments_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `type_def_fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `type_def_field_arguments_ibfk_2` FOREIGN KEY (`argument_id`) REFERENCES `type_def_fields` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_def_field_arguments`
--

LOCK TABLES `type_def_field_arguments` WRITE;
/*!40000 ALTER TABLE `type_def_field_arguments` DISABLE KEYS */;
INSERT INTO `type_def_field_arguments` VALUES (23,25),(23,26);
/*!40000 ALTER TABLE `type_def_field_arguments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_def_fields`
--

DROP TABLE IF EXISTS `type_def_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_def_fields` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` tinytext COLLATE utf8mb4_general_ci,
  `is_nullable` tinyint(1) NOT NULL DEFAULT '1',
  `is_array` tinyint(1) NOT NULL DEFAULT '0',
  `is_array_nullable` tinyint(1) NOT NULL DEFAULT '1',
  `is_deprecated` tinyint(1) NOT NULL DEFAULT '0',
  `parent_type_id` int unsigned DEFAULT NULL,
  `children_type_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`parent_type_id`),
  KEY `parent_type_id` (`parent_type_id`),
  KEY `children_type_id` (`children_type_id`),
  CONSTRAINT `type_def_fields_ibfk_1` FOREIGN KEY (`parent_type_id`) REFERENCES `type_def_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `type_def_fields_ibfk_2` FOREIGN KEY (`children_type_id`) REFERENCES `type_def_types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=363 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_def_fields`
--

LOCK TABLES `type_def_fields` WRITE;
/*!40000 ALTER TABLE `type_def_fields` DISABLE KEYS */;
INSERT INTO `type_def_fields` VALUES (1,'PUBLIC',NULL,1,0,0,0,7,3),(2,'PRIVATE',NULL,1,0,0,0,7,3),(3,'B2B',NULL,1,0,0,0,8,3),(4,'B2C',NULL,1,0,0,0,8,3),(5,'DE',NULL,1,0,0,0,9,3),(6,'ES',NULL,1,0,0,0,9,3),(7,'FR',NULL,1,0,0,0,9,3),(8,'GB',NULL,1,0,0,0,9,3),(9,'IT',NULL,1,0,0,0,9,3),(10,'maxAge',NULL,1,0,1,0,10,2),(11,'scope',NULL,1,0,1,0,10,7),(12,'inheritMaxAge',NULL,1,0,1,0,10,6),(13,'fields',NULL,0,0,1,0,13,3),(14,'fields',NULL,0,0,1,0,14,3),(15,'fields',NULL,0,0,1,0,15,3),(16,'brandId',NULL,0,0,1,0,16,2),(17,'description',NULL,1,0,1,0,16,3),(18,'id',NULL,0,0,1,0,16,4),(19,'logo',NULL,1,0,1,0,16,3),(20,'market',NULL,0,0,1,0,16,8),(21,'platform',NULL,0,0,1,0,16,9),(22,'slug',NULL,0,0,1,0,16,3),(23,'testFieldWithArguments',NULL,1,0,1,0,16,3),(24,'title',NULL,0,0,1,0,16,3),(25,'fieldArgument1',NULL,0,0,1,0,16,5),(26,'fieldArgument2',NULL,0,0,1,0,16,5),(27,'sdl','The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied',1,0,1,0,17,3),(35,'url',NULL,0,0,1,0,27,3),(36,'path',NULL,0,0,1,0,27,3),(37,'id',NULL,0,0,1,0,28,2),(38,'title',NULL,0,0,1,0,28,3),(39,'platform',NULL,0,0,1,0,28,9),(40,'body',NULL,0,0,1,0,28,3),(41,'leadParagraph',NULL,1,0,1,0,28,3),(42,'visible',NULL,0,0,1,0,28,6),(43,'categoryId',NULL,0,0,1,0,28,2),(44,'categories',NULL,0,1,1,0,28,2),(45,'slug',NULL,1,0,1,0,28,3),(46,'picture',NULL,0,0,1,0,28,27),(47,'categoryPicture',NULL,0,0,1,0,28,27),(48,'buttonText',NULL,0,0,1,0,28,3),(49,'buttonUrl',NULL,0,0,1,0,28,3),(50,'author',NULL,0,0,1,0,28,2),(51,'features',NULL,0,1,1,0,28,3),(67,'clientMutationId',NULL,1,0,1,0,46,3),(68,'b2bWelcome',NULL,1,0,1,0,46,6),(69,'clientMutationId',NULL,1,0,1,0,47,3),(70,'customerSegments',NULL,1,0,1,0,47,48),(71,'profile',NULL,1,0,1,0,48,3),(72,'b2bScore',NULL,1,0,1,0,48,2),(73,'deferredPayment',NULL,1,0,1,0,48,3),(74,'cluster',NULL,1,0,1,0,48,3),(75,'b2bIntention',NULL,1,0,1,0,48,3),(76,'b2bSuspectedPro',NULL,1,0,1,0,48,3),(77,'favoriteBrands',NULL,1,1,1,0,48,2),(78,'favoriteCategories',NULL,1,1,1,0,48,2),(79,'b2bWelcome',NULL,1,0,1,0,48,6),(80,'preferredAdviceContactChannel',NULL,1,0,1,0,48,3),(86,'amountAchieved',NULL,1,0,1,0,52,5),(87,'amountTarget',NULL,1,0,1,0,52,5),(93,'modelId',NULL,0,0,1,0,57,2),(94,'platform',NULL,0,0,1,0,57,9),(95,'isCompetitive',NULL,1,0,1,0,57,6),(96,'isBestQualityOffer',NULL,1,0,1,0,57,6),(97,'commercialOperations',NULL,1,1,0,0,57,2),(103,'code',NULL,0,0,1,0,62,4),(104,'value',NULL,0,0,1,0,62,5),(105,'creationDate',NULL,0,0,1,0,62,3),(106,'expirationDate',NULL,0,0,1,0,62,3),(117,'id',NULL,0,0,1,0,73,4),(118,'title',NULL,0,0,1,0,73,3),(119,'text',NULL,0,0,1,0,73,3),(120,'textColor',NULL,0,0,1,0,73,3),(121,'buttonText',NULL,0,0,1,0,73,3),(122,'buttonTextColor',NULL,0,0,1,0,73,3),(123,'buttonBackgroundColor',NULL,0,0,1,0,73,3),(124,'link',NULL,0,0,1,0,73,3),(125,'relativeLink',NULL,0,0,1,0,73,3),(126,'appLink',NULL,1,0,1,0,73,3),(127,'startDate',NULL,0,0,1,0,73,3),(128,'endDate',NULL,0,0,1,0,73,3),(129,'imageUrl',NULL,0,0,1,0,73,3),(130,'mobileImageUrl',NULL,0,0,1,0,73,3),(131,'appImageUrl',NULL,0,0,1,0,73,3),(132,'campaignName',NULL,0,0,1,0,73,3),(133,'title',NULL,0,0,1,0,74,3),(134,'link',NULL,0,0,1,0,74,3),(135,'relativeLink',NULL,0,0,1,0,74,3),(136,'appLink',NULL,1,0,1,0,74,3),(137,'block',NULL,0,0,1,0,74,2),(138,'line',NULL,0,0,1,0,74,2),(139,'order',NULL,0,0,1,0,74,2),(140,'imageUrl',NULL,0,0,1,0,74,3),(141,'mobileImageUrl',NULL,0,0,1,0,74,3),(151,'categoryId',NULL,0,0,1,0,82,2),(152,'level',NULL,0,0,1,0,82,2),(153,'image',NULL,1,0,1,0,82,3),(154,'platform',NULL,0,0,1,0,82,9),(155,'name',NULL,0,0,1,0,82,3),(156,'slug',NULL,0,0,1,0,82,3),(157,'display',NULL,0,0,1,0,82,6),(158,'children',NULL,0,1,0,0,82,83),(159,'ancestors',NULL,0,1,0,0,82,83),(160,'categoryId',NULL,0,0,1,0,83,2),(161,'level',NULL,0,0,1,0,83,2),(162,'image',NULL,1,0,1,0,83,3),(163,'name',NULL,0,0,1,0,83,3),(164,'slug',NULL,0,0,1,0,83,3),(165,'display',NULL,0,0,1,0,83,6),(166,'appHomepageB2cMainPromotion',NULL,1,0,0,0,88,3),(167,'bottomBanner',NULL,1,0,0,0,88,3),(168,'homepageB2CMainPromotion',NULL,1,0,0,0,88,3),(169,'homepageB2CSecondaryPromotion',NULL,1,0,0,0,88,3),(170,'middleBanner',NULL,1,0,0,0,88,3),(171,'ongletBanner',NULL,1,0,0,0,88,3),(172,'topBanner',NULL,1,0,0,0,88,3),(183,'height',NULL,0,0,1,0,96,2),(184,'url',NULL,0,0,1,0,96,3),(185,'width',NULL,0,0,1,0,96,2),(186,'level0Id',NULL,1,0,1,0,97,5),(187,'level0Name',NULL,1,0,1,0,97,3),(188,'level1Id',NULL,1,0,1,0,97,5),(189,'level1Name',NULL,1,0,1,0,97,3),(190,'pageName',NULL,1,0,1,0,97,3),(191,'position',NULL,1,0,1,0,97,5),(192,'campaigns',NULL,0,1,0,0,98,99),(193,'market',NULL,0,0,1,0,98,8),(194,'platform',NULL,0,0,1,0,98,9),(195,'space',NULL,0,0,1,0,98,88),(196,'creativeDesktop',NULL,1,0,1,0,99,96),(197,'creativeMobile',NULL,1,0,1,0,99,96),(198,'description',NULL,1,0,1,0,99,3),(199,'endDate',NULL,1,0,1,0,99,2),(200,'market',NULL,0,0,1,0,99,8),(201,'name',NULL,0,0,1,0,99,3),(202,'platform',NULL,0,0,1,0,99,9),(203,'redirectionUrl',NULL,1,0,1,0,99,3),(204,'space',NULL,0,0,1,0,99,88),(205,'startDate',NULL,1,0,1,0,99,2),(206,'target',NULL,1,0,1,0,99,97),(207,'uuid',NULL,0,0,1,0,99,3),(209,'EUR',NULL,1,0,0,0,109,3),(210,'GBP',NULL,1,0,0,0,109,3),(220,'model_id',NULL,0,0,1,0,116,2),(221,'platform',NULL,0,0,1,0,117,9),(222,'is_pro',NULL,0,0,1,0,117,6),(223,'article_id',NULL,1,0,1,0,117,102),(224,'model_id',NULL,1,0,1,0,117,102),(225,'product_id',NULL,1,0,1,0,117,102),(226,'masterProduct',NULL,0,0,1,0,117,118),(227,'sku',NULL,1,0,1,0,117,119),(228,'offer',NULL,1,0,1,0,117,120),(229,'article_id',NULL,0,0,1,0,118,102),(230,'master_product_id',NULL,1,0,1,0,118,102),(231,'is_indexable',NULL,0,0,1,0,118,6),(232,'category_id',NULL,0,0,1,0,118,2),(233,'brand',NULL,0,0,1,0,118,16),(234,'category',NULL,0,0,1,0,118,82),(235,'is_top_sale',NULL,0,0,1,0,118,6),(236,'model_id',NULL,0,0,1,0,119,2),(237,'mm_id',NULL,1,0,1,0,119,102),(238,'title',NULL,0,0,1,0,119,3),(239,'media',NULL,0,1,1,0,119,121),(240,'description',NULL,1,0,1,0,119,122),(241,'reference',NULL,0,0,1,0,119,3),(242,'is_available_in_pro',NULL,0,0,1,0,119,6),(243,'variants',NULL,1,0,1,0,119,123),(244,'rating',NULL,0,0,1,0,119,129),(245,'attributes',NULL,1,1,1,0,119,130),(246,'slug_article',NULL,1,0,1,0,119,3),(247,'is_pro_product',NULL,0,0,1,0,119,6),(248,'manufacturer_sku',NULL,1,0,1,0,119,3),(249,'ean',NULL,1,0,1,0,119,3),(250,'repairability_index',NULL,1,0,1,0,119,5),(251,'product_id',NULL,0,0,1,0,120,2),(252,'offer_id',NULL,1,0,1,0,120,3),(253,'is_for_sale',NULL,0,0,1,0,120,6),(254,'sku',NULL,1,0,1,0,120,3),(255,'warranty',NULL,1,0,1,0,120,3),(256,'stock',NULL,1,0,1,0,120,132),(257,'price',NULL,0,0,1,0,120,133),(258,'delivery',NULL,0,0,1,0,120,137),(259,'seller',NULL,0,0,1,0,120,138),(260,'related_sellers',NULL,0,0,1,0,120,2),(261,'is_best_offer',NULL,0,0,1,0,120,6),(262,'unit_count',NULL,1,0,1,0,120,103),(263,'unit_count_type',NULL,1,0,1,0,120,3),(264,'regular_url',NULL,1,0,1,0,121,3),(265,'thumbnail_url',NULL,1,0,1,0,121,3),(266,'large_url',NULL,1,0,1,0,121,3),(267,'specification_url',NULL,1,0,1,0,122,3),(268,'text',NULL,1,0,1,0,122,3),(269,'is_legacy',NULL,0,0,1,0,123,6),(270,'data',NULL,0,1,1,0,123,116),(271,'model_id',NULL,0,0,1,0,124,2),(272,'mm_id',NULL,0,0,1,0,124,102),(273,'attributes',NULL,0,1,1,0,124,125),(274,'id',NULL,0,0,1,0,125,102),(275,'type',NULL,0,0,1,0,125,3),(276,'name',NULL,1,0,1,0,125,3),(277,'value_type',NULL,0,0,1,0,125,3),(278,'value',NULL,0,1,1,0,125,126),(279,'unit',NULL,1,0,1,0,125,127),(280,'order',NULL,0,0,1,0,125,2),(281,'data',NULL,1,0,1,0,126,104),(282,'image_url',NULL,1,0,1,0,126,3),(283,'color_hex',NULL,1,0,1,0,126,3),(284,'id',NULL,1,0,1,0,127,2),(285,'name',NULL,1,0,1,0,127,3),(286,'description',NULL,1,0,1,0,127,3),(287,'abbreviation',NULL,1,0,1,0,127,3),(288,'display_abbreviation',NULL,1,0,1,0,127,6),(289,'model_id',NULL,0,0,1,0,128,2),(290,'description',NULL,1,0,1,0,128,3),(291,'is_product_b2b',NULL,0,0,1,0,128,6),(292,'total_ratings',NULL,0,0,1,0,129,2),(293,'average',NULL,0,0,1,0,129,5),(294,'attribute',NULL,1,0,1,0,130,131),(295,'value',NULL,1,0,1,0,130,3),(296,'unit',NULL,1,0,1,0,130,3),(297,'id',NULL,1,0,1,0,131,2),(298,'name',NULL,1,0,1,0,131,3),(299,'total_stock',NULL,0,0,1,0,132,2),(300,'stock_available_in_weeks',NULL,0,0,1,0,132,2),(301,'stock_minimum_value',NULL,0,0,1,0,132,2),(302,'increase_quantity',NULL,0,0,1,0,132,2),(303,'currency',NULL,0,0,1,0,133,109),(304,'retail_price',NULL,1,0,1,0,133,134),(305,'eco_participation_with_vat',NULL,1,0,1,0,133,103),(306,'current_price',NULL,1,0,1,0,133,135),(307,'measurement_price',NULL,1,0,1,0,133,136),(308,'discount_percentage_for_primary_price',NULL,1,0,1,0,133,2),(309,'measurement_price_is_primary_price',NULL,0,0,1,0,133,6),(310,'is_payment3x_activated',NULL,0,0,1,0,133,6),(311,'vat_rate',NULL,0,0,1,0,134,103),(312,'amount_with_vat',NULL,0,0,1,0,134,103),(313,'amount_without_vat',NULL,0,0,1,0,134,103),(314,'vat_rate',NULL,0,0,1,0,135,103),(315,'amount_with_vat',NULL,0,0,1,0,135,103),(316,'amount_without_vat',NULL,0,0,1,0,135,103),(317,'vat_rate',NULL,0,0,1,0,136,103),(318,'amount_with_vat',NULL,0,0,1,0,136,103),(319,'amount_without_vat',NULL,0,0,1,0,136,103),(320,'measurement_unit',NULL,0,0,1,0,136,3),(321,'delivery_expenses',NULL,1,0,1,0,137,3),(322,'is_fulfillment',NULL,0,0,1,0,137,6),(323,'weight',NULL,1,0,1,0,137,5),(324,'warehouse_id',NULL,1,0,1,0,137,2),(325,'id',NULL,0,0,1,0,138,2),(326,'country',NULL,1,0,1,0,138,3),(327,'name',NULL,1,0,1,0,138,3),(328,'url',NULL,1,0,1,0,138,3),(334,'aaa',NULL,1,0,0,0,147,3),(335,'aab',NULL,1,0,0,0,147,3),(336,'aba',NULL,1,0,0,0,147,3),(337,'abb',NULL,1,0,0,0,147,3),(338,'baa',NULL,1,0,0,0,147,3),(339,'bab',NULL,1,0,0,0,147,3),(340,'bba',NULL,1,0,0,0,147,3),(341,'bbb',NULL,1,0,0,0,147,3),(342,'bundle',NULL,1,0,0,0,148,3),(343,'categoryList',NULL,1,0,0,0,148,3),(344,'productList',NULL,1,0,0,0,148,3),(355,'categoryIds',NULL,1,1,0,0,156,2),(356,'displayAddToCartButton',NULL,1,0,1,0,156,6),(357,'displayType','Type of display',0,0,1,0,156,3),(358,'displayTypeEnum','Same data as in displayType field but in enum. No dashes \"-\" allowed.',0,0,1,0,156,148),(359,'engineName','Unique identification name of the engine',0,0,1,0,156,4),(360,'name','Internationalized name of the engine',0,0,1,0,156,3),(361,'products',NULL,1,1,1,0,156,117);
/*!40000 ALTER TABLE `type_def_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_def_implementations`
--

DROP TABLE IF EXISTS `type_def_implementations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_def_implementations` (
  `interface_id` int unsigned DEFAULT NULL,
  `implementation_id` int unsigned DEFAULT NULL,
  KEY `interface_id` (`interface_id`),
  KEY `implementation_id` (`implementation_id`),
  CONSTRAINT `type_def_implementations_ibfk_1` FOREIGN KEY (`interface_id`) REFERENCES `type_def_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `type_def_implementations_ibfk_2` FOREIGN KEY (`implementation_id`) REFERENCES `type_def_types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_def_implementations`
--

LOCK TABLES `type_def_implementations` WRITE;
/*!40000 ALTER TABLE `type_def_implementations` DISABLE KEYS */;
INSERT INTO `type_def_implementations` VALUES (116,124),(116,128);
/*!40000 ALTER TABLE `type_def_implementations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_def_operation_parameters`
--

DROP TABLE IF EXISTS `type_def_operation_parameters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_def_operation_parameters` (
  `operation_id` int unsigned DEFAULT NULL,
  `type_id` int unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` tinytext COLLATE utf8mb4_general_ci,
  `is_nullable` tinyint(1) NOT NULL DEFAULT '1',
  `is_array` tinyint(1) NOT NULL DEFAULT '0',
  `is_array_nullable` tinyint(1) NOT NULL DEFAULT '1',
  `is_output` tinyint(1) NOT NULL,
  UNIQUE KEY `operation_id` (`operation_id`,`type_id`,`name`),
  KEY `type_id` (`type_id`),
  KEY `is_output` (`operation_id`,`is_output`),
  CONSTRAINT `type_def_operation_parameters_ibfk_1` FOREIGN KEY (`operation_id`) REFERENCES `type_def_operations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `type_def_operation_parameters_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `type_def_types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_def_operation_parameters`
--

LOCK TABLES `type_def_operation_parameters` WRITE;
/*!40000 ALTER TABLE `type_def_operation_parameters` DISABLE KEYS */;
INSERT INTO `type_def_operation_parameters` VALUES (1,18,'_Entity',NULL,0,1,1,1),(1,1,'representations',NULL,0,1,0,0),(2,17,'_Service',NULL,0,0,1,1),(3,16,'Brand',NULL,0,0,1,1),(3,2,'brandId',NULL,0,0,1,0),(3,8,'market',NULL,0,0,1,0),(3,9,'platform',NULL,0,0,1,0),(4,16,'Brand',NULL,0,1,0,1),(4,2,'brandIds',NULL,0,1,0,0),(4,8,'market',NULL,0,0,1,0),(4,9,'platform',NULL,0,0,1,0),(5,28,'Tipsheet',NULL,1,0,1,1),(5,2,'id',NULL,0,0,1,0),(6,16,'Brand','homepageB2cBrands is now deprecated',0,1,0,1),(6,9,'platform',NULL,0,0,1,0),(7,16,'Brand',NULL,1,1,0,1),(7,9,'platform',NULL,0,0,1,0),(8,28,'Tipsheet','homepageB2cTipsheets is now deprecated',0,1,0,1),(8,9,'platform',NULL,0,0,1,0),(9,28,'Tipsheet',NULL,1,1,0,1),(9,9,'platform',NULL,0,0,1,0),(12,47,'UpdateCustomerSegmentsPayload',NULL,1,0,1,1),(12,46,'updateCustomerSegmentsInput',NULL,0,0,1,0),(13,52,'LoyaltyProgramRewardStatus',NULL,1,0,1,1),(13,9,'platform',NULL,0,0,1,0),(14,57,'ModelAttributes',NULL,1,1,0,1),(14,2,'modelIds',NULL,1,1,0,0),(14,9,'platform',NULL,0,0,1,0),(15,62,'Coupon',NULL,1,1,1,1),(15,9,'platform',NULL,0,0,1,0),(16,73,'ProBanner',NULL,1,0,1,1),(16,9,'platform',NULL,0,0,1,0),(17,74,'ProOffer',NULL,1,1,1,1),(17,9,'platform',NULL,0,0,1,0),(18,16,'Brand',NULL,1,1,1,1),(18,9,'platform',NULL,0,0,1,0),(19,82,'Category',NULL,0,0,1,1),(19,9,'platform',NULL,0,0,1,0),(19,2,'categoryId',NULL,0,0,1,0),(20,99,'PromotionCampaign',NULL,1,1,0,1),(20,8,'market',NULL,0,0,1,0),(20,9,'platform',NULL,0,0,1,0),(20,88,'space',NULL,0,0,1,0),(21,98,'FederatedPromotionCampaigns',NULL,0,0,1,1),(21,8,'market',NULL,0,0,1,0),(21,9,'platform',NULL,0,0,1,0),(21,88,'space',NULL,0,0,1,0),(24,117,'Product',NULL,1,0,1,1),(24,9,'platform',NULL,0,0,1,0),(24,8,'market',NULL,0,0,1,0),(24,102,'article_id',NULL,1,0,1,0),(24,102,'model_id',NULL,1,0,1,0),(24,102,'product_id',NULL,1,0,1,0),(25,156,'Engine',NULL,1,1,0,1),(25,147,'abtestPools',NULL,0,0,1,0),(25,2,'categoryId',NULL,1,0,1,0),(25,2,'categoryIds',NULL,1,1,0,0),(25,6,'isPro',NULL,0,0,1,0),(25,2,'limit','Limit the first n products. A negative number will return last n products. Default is 10.',1,0,1,0),(25,8,'market',NULL,0,0,1,0),(25,102,'modelId',NULL,1,0,1,0),(25,102,'modelIds',NULL,1,1,0,0),(25,3,'pageType',NULL,0,0,1,0),(25,9,'platformId',NULL,0,0,1,0),(25,102,'productId',NULL,1,0,1,0),(25,102,'productIds',NULL,1,1,0,0);
/*!40000 ALTER TABLE `type_def_operation_parameters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_def_operations`
--

DROP TABLE IF EXISTS `type_def_operations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_def_operations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` tinytext COLLATE utf8mb4_general_ci,
  `type` enum('QUERY','MUTATION','SUBSCRIPTION') COLLATE utf8mb4_general_ci NOT NULL,
  `service_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`type`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `type_def_operations_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_def_operations`
--

LOCK TABLES `type_def_operations` WRITE;
/*!40000 ALTER TABLE `type_def_operations` DISABLE KEYS */;
INSERT INTO `type_def_operations` VALUES (1,'_entities',NULL,'QUERY',14),(2,'_service',NULL,'QUERY',14),(3,'brand',NULL,'QUERY',3),(4,'brands',NULL,'QUERY',3),(5,'tipsheet',NULL,'QUERY',4),(6,'homepageB2cBrands','homepageB2cBrands is now deprecated','QUERY',5),(7,'homepageB2cBrandsV1',NULL,'QUERY',5),(8,'homepageB2cTipsheets','homepageB2cTipsheets is now deprecated','QUERY',5),(9,'homepageB2cTipsheetsV1',NULL,'QUERY',5),(12,'updateCustomerSegments',NULL,'MUTATION',6),(13,'loyaltyProgramRewardStatus',NULL,'QUERY',7),(14,'modelAttributes',NULL,'QUERY',8),(15,'loyaltyCoupons',NULL,'QUERY',9),(16,'activeProBanner',NULL,'QUERY',10),(17,'proOffers',NULL,'QUERY',10),(18,'proBrands',NULL,'QUERY',10),(19,'category',NULL,'QUERY',11),(20,'campaigns',NULL,'QUERY',12),(21,'federatedCampaigns',NULL,'QUERY',12),(24,'searchProduct',NULL,'QUERY',13),(25,'recommendationEngines',NULL,'QUERY',14);
/*!40000 ALTER TABLE `type_def_operations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_def_subgraphs`
--

DROP TABLE IF EXISTS `type_def_subgraphs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_def_subgraphs` (
  `service_id` int unsigned DEFAULT NULL,
  `type_id` int unsigned DEFAULT NULL,
  UNIQUE KEY `service_id` (`service_id`,`type_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `type_def_subgraphs_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  CONSTRAINT `type_def_subgraphs_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `type_def_types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_def_subgraphs`
--

LOCK TABLES `type_def_subgraphs` WRITE;
/*!40000 ALTER TABLE `type_def_subgraphs` DISABLE KEYS */;
INSERT INTO `type_def_subgraphs` VALUES (3,1),(3,2),(3,3),(3,4),(3,5),(3,6),(3,7),(3,8),(3,9),(3,10),(3,11),(3,12),(3,13),(3,14),(3,15),(3,16),(3,17),(3,18),(4,2),(4,3),(4,6),(4,9),(4,11),(4,12),(4,13),(4,15),(4,27),(4,28),(5,1),(5,2),(5,3),(5,8),(5,9),(5,11),(5,12),(5,13),(5,14),(5,15),(5,16),(5,17),(5,18),(5,28),(6,2),(6,3),(6,6),(6,46),(6,47),(6,48),(7,3),(7,5),(7,9),(7,52),(8,2),(8,3),(8,6),(8,9),(8,57),(9,3),(9,4),(9,5),(9,9),(9,62),(10,2),(10,3),(10,4),(10,8),(10,9),(10,11),(10,12),(10,13),(10,14),(10,15),(10,16),(10,73),(10,74),(11,2),(11,3),(11,6),(11,9),(11,12),(11,13),(11,82),(11,83),(12,1),(12,2),(12,3),(12,5),(12,8),(12,9),(12,11),(12,12),(12,13),(12,14),(12,15),(12,17),(12,18),(12,88),(12,96),(12,97),(12,98),(12,99),(13,2),(13,3),(13,5),(13,6),(13,8),(13,9),(13,11),(13,12),(13,13),(13,15),(13,16),(13,82),(13,102),(13,103),(13,104),(13,109),(13,116),(13,117),(13,118),(13,119),(13,120),(13,121),(13,122),(13,123),(13,124),(13,125),(13,126),(13,127),(13,128),(13,129),(13,130),(13,131),(13,132),(13,133),(13,134),(13,135),(13,136),(13,137),(13,138),(14,1),(14,2),(14,3),(14,4),(14,6),(14,8),(14,9),(14,11),(14,12),(14,13),(14,14),(14,15),(14,17),(14,18),(14,102),(14,117),(14,147),(14,148),(14,156);
/*!40000 ALTER TABLE `type_def_subgraphs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_def_types`
--

DROP TABLE IF EXISTS `type_def_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_def_types` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` tinytext COLLATE utf8mb4_general_ci,
  `type` enum('OBJECT','SCALAR','INTERFACE','ENUM','INPUT','UNION','DIRECTIVE') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_def_types`
--

LOCK TABLES `type_def_types` WRITE;
/*!40000 ALTER TABLE `type_def_types` DISABLE KEYS */;
INSERT INTO `type_def_types` VALUES (1,'_Any',NULL,'SCALAR'),(2,'Int',NULL,'SCALAR'),(3,'String',NULL,'SCALAR'),(4,'ID',NULL,'SCALAR'),(5,'Float',NULL,'SCALAR'),(6,'Boolean',NULL,'SCALAR'),(7,'CacheControlScope',NULL,'ENUM'),(8,'Market',NULL,'ENUM'),(9,'Platform',NULL,'ENUM'),(10,'cacheControl',NULL,'DIRECTIVE'),(11,'extends',NULL,'DIRECTIVE'),(12,'external',NULL,'DIRECTIVE'),(13,'key',NULL,'DIRECTIVE'),(14,'provides',NULL,'DIRECTIVE'),(15,'requires',NULL,'DIRECTIVE'),(16,'Brand',NULL,'OBJECT'),(17,'_Service',NULL,'OBJECT'),(18,'_Entity',NULL,'OBJECT'),(27,'TipsheetPicture',NULL,'OBJECT'),(28,'Tipsheet',NULL,'OBJECT'),(46,'UpdateCustomerSegmentsInput',NULL,'INPUT'),(47,'UpdateCustomerSegmentsPayload',NULL,'OBJECT'),(48,'CustomerSegments',NULL,'OBJECT'),(52,'LoyaltyProgramRewardStatus',NULL,'OBJECT'),(57,'ModelAttributes',NULL,'OBJECT'),(62,'Coupon',NULL,'OBJECT'),(73,'ProBanner',NULL,'OBJECT'),(74,'ProOffer',NULL,'OBJECT'),(82,'Category',NULL,'OBJECT'),(83,'RelatedCategory',NULL,'OBJECT'),(88,'Space',NULL,'ENUM'),(96,'CampaignImage',NULL,'OBJECT'),(97,'CampaignTarget','Data received from datasource. Check PromotionCampaign.targets field.','OBJECT'),(98,'FederatedPromotionCampaigns',NULL,'OBJECT'),(99,'PromotionCampaign',NULL,'OBJECT'),(102,'BigInteger','The `BigInteger` scalar type represents non-fractional signed whole numeric values. BigInteger can represent values larger than -(2^53) + 1 and 2^53 - 1. ','SCALAR'),(103,'BigDecimal',NULL,'SCALAR'),(104,'Object',NULL,'SCALAR'),(109,'Currency',NULL,'ENUM'),(116,'VariantInterface',NULL,'INTERFACE'),(117,'Product',NULL,'OBJECT'),(118,'MasterProduct',NULL,'OBJECT'),(119,'Sku',NULL,'OBJECT'),(120,'Offer',NULL,'OBJECT'),(121,'Media',NULL,'OBJECT'),(122,'Description',NULL,'OBJECT'),(123,'VariantWrapper',NULL,'OBJECT'),(124,'Variant',NULL,'OBJECT'),(125,'AttributeVariant',NULL,'OBJECT'),(126,'AttributeValue',NULL,'OBJECT'),(127,'AttributeUnit',NULL,'OBJECT'),(128,'AvailableModelReference',NULL,'OBJECT'),(129,'Rating',NULL,'OBJECT'),(130,'CatalogAttribute',NULL,'OBJECT'),(131,'Attribute',NULL,'OBJECT'),(132,'Stock',NULL,'OBJECT'),(133,'Price',NULL,'OBJECT'),(134,'PriceDetail',NULL,'OBJECT'),(135,'CurrentPrice',NULL,'OBJECT'),(136,'MeasurementPrice',NULL,'OBJECT'),(137,'Delivery',NULL,'OBJECT'),(138,'Seller',NULL,'OBJECT'),(147,'ABTestPool',NULL,'ENUM'),(148,'DisplayType',NULL,'ENUM'),(156,'Engine',NULL,'OBJECT');
/*!40000 ALTER TABLE `type_def_types` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-30 13:23:13

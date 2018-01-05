<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180105043638 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE video_link (id INT AUTO_INCREMENT NOT NULL, source VARCHAR(255) NOT NULL, videoId VARCHAR(255) NOT NULL, userId INT NOT NULL, eventId INT NOT NULL, INDEX IDX_313BC42D64B64DCC (userId), INDEX IDX_313BC42D2B2EBB6C (eventId), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE event (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, timeStart DATETIME NOT NULL, timeEnd DATETIME NOT NULL, ownerId INT NOT NULL, INDEX IDX_3BAE0AA7E05EFD25 (ownerId), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE event_event_tag (eventId INT NOT NULL, tagId INT NOT NULL, INDEX IDX_94D34C6D2B2EBB6C (eventId), INDEX IDX_94D34C6D6F16ADDC (tagId), PRIMARY KEY(eventId, tagId)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE event_members (eventId INT NOT NULL, userId INT NOT NULL, INDEX IDX_C0F77B502B2EBB6C (eventId), INDEX IDX_C0F77B5064B64DCC (userId), PRIMARY KEY(eventId, userId)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_like_event (eventId INT NOT NULL, userId INT NOT NULL, INDEX IDX_2BADE5AC2B2EBB6C (eventId), INDEX IDX_2BADE5AC64B64DCC (userId), PRIMARY KEY(eventId, userId)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE event_picture (id INT AUTO_INCREMENT NOT NULL, userId INT NOT NULL, eventId INT DEFAULT NULL, INDEX IDX_938CE62664B64DCC (userId), INDEX IDX_938CE6262B2EBB6C (eventId), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE event_tag (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_124672502B36786B (title), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE video_link ADD CONSTRAINT FK_313BC42D64B64DCC FOREIGN KEY (userId) REFERENCES fos_user (id)');
        $this->addSql('ALTER TABLE video_link ADD CONSTRAINT FK_313BC42D2B2EBB6C FOREIGN KEY (eventId) REFERENCES event (id)');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA7E05EFD25 FOREIGN KEY (ownerId) REFERENCES fos_user (id)');
        $this->addSql('ALTER TABLE event_event_tag ADD CONSTRAINT FK_94D34C6D2B2EBB6C FOREIGN KEY (eventId) REFERENCES event (id)');
        $this->addSql('ALTER TABLE event_event_tag ADD CONSTRAINT FK_94D34C6D6F16ADDC FOREIGN KEY (tagId) REFERENCES event_tag (id)');
        $this->addSql('ALTER TABLE event_members ADD CONSTRAINT FK_C0F77B502B2EBB6C FOREIGN KEY (eventId) REFERENCES event (id)');
        $this->addSql('ALTER TABLE event_members ADD CONSTRAINT FK_C0F77B5064B64DCC FOREIGN KEY (userId) REFERENCES fos_user (id)');
        $this->addSql('ALTER TABLE user_like_event ADD CONSTRAINT FK_2BADE5AC2B2EBB6C FOREIGN KEY (eventId) REFERENCES event (id)');
        $this->addSql('ALTER TABLE user_like_event ADD CONSTRAINT FK_2BADE5AC64B64DCC FOREIGN KEY (userId) REFERENCES fos_user (id)');
        $this->addSql('ALTER TABLE event_picture ADD CONSTRAINT FK_938CE62664B64DCC FOREIGN KEY (userId) REFERENCES fos_user (id)');
        $this->addSql('ALTER TABLE event_picture ADD CONSTRAINT FK_938CE6262B2EBB6C FOREIGN KEY (eventId) REFERENCES event (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE video_link DROP FOREIGN KEY FK_313BC42D2B2EBB6C');
        $this->addSql('ALTER TABLE event_event_tag DROP FOREIGN KEY FK_94D34C6D2B2EBB6C');
        $this->addSql('ALTER TABLE event_members DROP FOREIGN KEY FK_C0F77B502B2EBB6C');
        $this->addSql('ALTER TABLE user_like_event DROP FOREIGN KEY FK_2BADE5AC2B2EBB6C');
        $this->addSql('ALTER TABLE event_picture DROP FOREIGN KEY FK_938CE6262B2EBB6C');
        $this->addSql('ALTER TABLE event_event_tag DROP FOREIGN KEY FK_94D34C6D6F16ADDC');
        $this->addSql('DROP TABLE video_link');
        $this->addSql('DROP TABLE event');
        $this->addSql('DROP TABLE event_event_tag');
        $this->addSql('DROP TABLE event_members');
        $this->addSql('DROP TABLE user_like_event');
        $this->addSql('DROP TABLE event_picture');
        $this->addSql('DROP TABLE event_tag');
    }
}

# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_201_204_000_437) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'active_storage_attachments', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'record_type', null: false
    t.bigint 'record_id', null: false
    t.bigint 'blob_id', null: false
    t.datetime 'created_at', null: false
    t.index ['blob_id'], name: 'index_active_storage_attachments_on_blob_id'
    t.index %w[record_type record_id name blob_id], name: 'index_active_storage_attachments_uniqueness', unique: true
  end

  create_table 'active_storage_blobs', force: :cascade do |t|
    t.string 'key', null: false
    t.string 'filename', null: false
    t.string 'content_type'
    t.text 'metadata'
    t.bigint 'byte_size', null: false
    t.string 'checksum', null: false
    t.datetime 'created_at', null: false
    t.index ['key'], name: 'index_active_storage_blobs_on_key', unique: true
  end

  create_table 'certificates', force: :cascade do |t|
    t.bigint 'course_id', null: false
    t.bigint 'user_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index %w[course_id user_id], name: 'index_certificates_on_course_id_and_user_id', unique: true
    t.index ['course_id'], name: 'index_certificates_on_course_id'
    t.index ['user_id'], name: 'index_certificates_on_user_id'
  end

  create_table 'comments', force: :cascade do |t|
    t.bigint 'course_id', null: false
    t.string 'content', default: '', null: false
    t.bigint 'author_id'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['author_id'], name: 'index_comments_on_author_id'
    t.index ['course_id'], name: 'index_comments_on_course_id'
  end

  create_table 'course_members', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.bigint 'course_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['course_id'], name: 'index_course_members_on_course_id'
    t.index ['user_id'], name: 'index_course_members_on_user_id'
  end

  create_table 'course_tags', force: :cascade do |t|
    t.bigint 'course_id', null: false
    t.bigint 'tag_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index %w[course_id tag_id], name: 'index_course_tags_on_course_id_and_tag_id', unique: true
    t.index ['course_id'], name: 'index_course_tags_on_course_id'
    t.index ['tag_id'], name: 'index_course_tags_on_tag_id'
  end

  create_table 'courses', force: :cascade do |t|
    t.string 'label', default: '', null: false
    t.float 'mark'
    t.string 'why_content', default: '', null: false
    t.string 'will_content', default: '', null: false
    t.integer 'uses_count', default: 0, null: false
    t.float 'success_rate', default: 0.0, null: false
    t.integer 'access_type', default: 0, null: false
    t.integer 'approve_status', default: 0, null: false
    t.bigint 'organization_id'
    t.integer 'course_status', default: 0, null: false
    t.bigint 'author_id'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index %w[author_id label], name: 'index_courses_on_author_id_and_label', unique: true
    t.index ['author_id'], name: 'index_courses_on_author_id'
    t.index ['organization_id'], name: 'index_courses_on_organization_id'
  end

  create_table 'impersonations', force: :cascade do |t|
    t.datetime 'start', null: false
    t.datetime 'end', null: false
    t.bigint 'organization_id', null: false
    t.bigint 'manager_id'
    t.bigint 'common_id'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['common_id'], name: 'index_impersonations_on_common_id'
    t.index ['manager_id'], name: 'index_impersonations_on_manager_id'
    t.index ['organization_id'], name: 'index_impersonations_on_organization_id'
  end

  create_table 'organizations', force: :cascade do |t|
    t.string 'name', default: '', null: false
    t.string 'description', default: '', null: false
    t.integer 'approve_status', default: 0, null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'pages', force: :cascade do |t|
    t.bigint 'course_id', null: false
    t.integer 'order', default: 1, null: false
    t.string 'title', default: '', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index %w[course_id order], name: 'index_pages_on_course_id_and_order', unique: true
    t.index ['course_id'], name: 'index_pages_on_course_id'
  end

  create_table 'questions', force: :cascade do |t|
    t.bigint 'page_id', null: false
    t.integer 'question_type', default: 0, null: false
    t.string 'title', default: '', null: false
    t.string 'description', default: ''
    t.string 'question_text', default: '', null: false
    t.integer 'difficult', default: 0, null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index %w[page_id title], name: 'index_questions_on_page_id_and_title', unique: true
    t.index ['page_id'], name: 'index_questions_on_page_id'
  end

  create_table 'registered_members', force: :cascade do |t|
    t.integer 'member_role', default: 1, null: false
    t.bigint 'organization_id', null: false
    t.bigint 'user_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['organization_id'], name: 'index_registered_members_on_organization_id'
    t.index %w[user_id organization_id], name: 'index_registered_members_on_user_id_and_organization_id', unique: true
    t.index ['user_id'], name: 'index_registered_members_on_user_id'
  end

  create_table 'replies', force: :cascade do |t|
    t.bigint 'comment_id', null: false
    t.string 'content', default: '', null: false
    t.bigint 'author_id'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['author_id'], name: 'index_replies_on_author_id'
    t.index ['comment_id'], name: 'index_replies_on_comment_id'
  end

  create_table 'reports', force: :cascade do |t|
    t.bigint 'course_id', null: false
    t.float 'percent_try', default: 0.0, null: false
    t.integer 'count_try', default: 0, null: false
    t.integer 'count_failed', default: 0, null: false
    t.integer 'count_complete', default: 0, null: false
    t.float 'average_mark'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['course_id'], name: 'index_reports_on_course_id'
  end

  create_table 'sessions', force: :cascade do |t|
    t.string 'session_id', null: false
    t.text 'data'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['session_id'], name: 'index_sessions_on_session_id', unique: true
    t.index ['updated_at'], name: 'index_sessions_on_updated_at'
  end

  create_table 'tags', force: :cascade do |t|
    t.string 'name', default: '', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'theories', force: :cascade do |t|
    t.string 'title', default: ''
    t.text 'content', default: ''
    t.bigint 'page_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index %w[page_id title], name: 'index_theories_on_page_id_and_title', unique: true
    t.index ['page_id'], name: 'index_theories_on_page_id'
  end

  create_table 'unregistered_members', force: :cascade do |t|
    t.integer 'member_role', default: 1, null: false
    t.bigint 'organization_id', null: false
    t.string 'code', default: '', null: false
    t.string 'email', default: '', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index %w[email organization_id], name: 'index_unregistered_members_on_email_and_organization_id', unique: true
    t.index ['organization_id'], name: 'index_unregistered_members_on_organization_id'
  end

  create_table 'user_answers', force: :cascade do |t|
    t.bigint 'question_id', null: false
    t.string 'answer', default: '', null: false
    t.bigint 'user_id', null: false
    t.boolean 'is_correct', default: false, null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['question_id'], name: 'index_user_answers_on_question_id'
    t.index %w[user_id question_id answer], name: 'index_user_answers_on_user_id_and_question_id_and_answer', unique: true
    t.index ['user_id'], name: 'index_user_answers_on_user_id'
  end

  create_table 'user_courses', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.bigint 'course_id', null: false
    t.integer 'current_page', default: 1, null: false
    t.boolean 'is_favorite', default: false, null: false
    t.float 'progress', default: 0.0, null: false
    t.float 'correct', default: 100.0, null: false
    t.float 'mark'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['course_id'], name: 'index_user_courses_on_course_id'
    t.index %w[user_id course_id], name: 'index_user_courses_on_user_id_and_course_id', unique: true
    t.index ['user_id'], name: 'index_user_courses_on_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'login', default: '', null: false
    t.string 'email', default: '', null: false
    t.string 'decrypted_password', default: '', null: false
    t.string 'full_name', default: '', null: false
    t.integer 'user_role', default: 1, null: false
    t.string 'encrypted_password', default: '', null: false
    t.integer 'user_status', default: 0, null: false
    t.string 'provider', limit: 50, default: '', null: false
    t.string 'uid', limit: 500, default: '', null: false
    t.string 'language', default: 'en'
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.datetime 'remember_created_at'
    t.string 'confirmation_token'
    t.datetime 'confirmed_at'
    t.datetime 'confirmation_sent_at'
    t.string 'unconfirmed_email'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'variants', force: :cascade do |t|
    t.integer 'order', default: 1, null: false
    t.bigint 'question_id', null: false
    t.string 'value', default: '', null: false
    t.boolean 'is_correct', default: false, null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index %w[question_id order], name: 'index_variants_on_question_id_and_order', unique: true
    t.index ['question_id'], name: 'index_variants_on_question_id'
  end

  add_foreign_key 'active_storage_attachments', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'certificates', 'courses'
  add_foreign_key 'certificates', 'users'
  add_foreign_key 'comments', 'courses'
  add_foreign_key 'comments', 'users', column: 'author_id'
  add_foreign_key 'course_members', 'courses'
  add_foreign_key 'course_members', 'users'
  add_foreign_key 'course_tags', 'courses'
  add_foreign_key 'course_tags', 'tags'
  add_foreign_key 'courses', 'organizations'
  add_foreign_key 'courses', 'users', column: 'author_id'
  add_foreign_key 'impersonations', 'organizations'
  add_foreign_key 'impersonations', 'users', column: 'common_id'
  add_foreign_key 'impersonations', 'users', column: 'manager_id'
  add_foreign_key 'pages', 'courses'
  add_foreign_key 'questions', 'pages'
  add_foreign_key 'registered_members', 'organizations'
  add_foreign_key 'registered_members', 'users'
  add_foreign_key 'replies', 'comments'
  add_foreign_key 'replies', 'users', column: 'author_id'
  add_foreign_key 'reports', 'courses'
  add_foreign_key 'theories', 'pages'
  add_foreign_key 'unregistered_members', 'organizations'
  add_foreign_key 'user_answers', 'questions'
  add_foreign_key 'user_answers', 'users'
  add_foreign_key 'user_courses', 'courses'
  add_foreign_key 'user_courses', 'users'
  add_foreign_key 'variants', 'questions'
end

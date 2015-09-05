class MakeEmailNotNull < ActiveRecord::Migration
  def change
    change_column_default :users, :email, ''
    change_column_null :users, :email, false
  end
end

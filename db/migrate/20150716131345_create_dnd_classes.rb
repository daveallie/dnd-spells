class CreateDndClasses < ActiveRecord::Migration
  def change
    create_table :dnd_classes do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
